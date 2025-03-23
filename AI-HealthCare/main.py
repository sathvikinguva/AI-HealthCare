import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
import traceback
from aixplain.factories import PipelineFactory

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "expose_headers": ["Content-Type", "Content-Length"]
}})

ACCESS_KEY = "148f938ca75f850085decdec0f0d5c8853bbd07201fca6889a0cb8338d854bf4"
PIPELINE_ID = "67dbf90c181c58b7238ea9a3"

try:
    os.environ["AIXPLAIN_API_KEY"] = ACCESS_KEY
    pipeline = PipelineFactory.get(PIPELINE_ID)
    logger.info(f"Successfully loaded pipeline: {pipeline.name}")
    logger.info(f"Available pipeline methods: {[method for method in dir(pipeline) if not method.startswith('_')]}")
except Exception as e:
    logger.error(f"Failed to initialize pipeline: {str(e)}")
    pipeline = None

def download_and_convert_to_text(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  

        text_content = response.text
        return text_content

    except requests.exceptions.RequestException as e:
        logger.error(f"Error downloading the file: {e}")
        return None

@app.route('/api/text-to-text', methods=['POST'])
def text_to_text():
    try:
        if pipeline is None:
            logger.error("Pipeline not initialized")
            return jsonify({"response": "AI service not configured properly. Try again later."}), 500

        input_text = request.json.get('text')
        input_url = request.json.get('url')

        if not input_text and not input_url:
            logger.warning("Missing 'text' or 'url' in request")
            return jsonify({"error": "Missing 'text' or 'url' in request"}), 400

        if input_url:
            input_text = download_and_convert_to_text(input_url)
            if not input_text:
                return jsonify({"error": "Failed to download or convert the content from the URL"}), 400

        logger.info("Running pipeline for text processing...")
        result = pipeline.run({"Input 1": input_text})
        logger.info(f"Pipeline execution completed. Result: {result}")

        ai_response = ""
        if isinstance(result, dict) and "data" in result:
            data_items = result.get("data", [])
            if data_items and isinstance(data_items, list):
                for data_item in data_items:
                    segments = data_item.get("segments", [])
                    if segments and isinstance(segments, list):
                        for segment in segments:
                            if "response" in segment and isinstance(segment["response"], str):
                                if segment.get("is_url"):
                                    text_url = segment["response"]
                                    logger.info(f"Fetching text from URL: {text_url}")
                                    text_response = download_and_convert_to_text(text_url)
                                    if text_response:
                                        ai_response += text_response + " "
                                    else:
                                        logger.error(f"Failed to fetch text from URL")
                                        return jsonify({"response": "Failed to fetch the response text."})
                                else:
                                    ai_response += segment["response"] + " "

        ai_response = ai_response.strip() or "No response generated."
        logger.info(f"Generated Text: {ai_response}")
        return jsonify({"response": ai_response})

    except Exception as e:
        logger.error(f"Error during pipeline execution: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"response": "An error occurred while processing the text."}), 500

@app.route('/api/ping', methods=['GET'])
def ping():
    """Simple endpoint to check if the service is running"""
    return jsonify({
        "status": "ok",
        "pipeline_initialized": pipeline is not None,
        "pipeline_name": pipeline.name if pipeline else "Not initialized",
        "methods": [m for m in dir(pipeline) if not m.startswith('_')] if pipeline else []
    })

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
