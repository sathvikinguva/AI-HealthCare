# AI-HealthCare

This project is a web-based AI consultation tool that analyzes symptoms using a Flask API.

## Project Structure

```
ai.js
hac.css
hac.html
main.py
old.js
.aixplain_cache/
    functions.json
    languages.json
    licenses.json
```

- **ai.js**: Contains the JavaScript code for analyzing symptoms and interacting with the Flask API.
- **hac.css**: Contains the CSS styles for the web interface.
- **hac.html**: Contains the HTML structure for the web interface.
- **main.py**: Contains the Flask API implementation.
- **old.js**: Contains old or deprecated JavaScript code.
- **.aixplain_cache/**: Contains cached data files.

## Getting Started

### Prerequisites

- Python 3.x
- Flask

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

### Running the Project

1. Start the Flask API:
    ```sh
    python main.py
    ```

2. Open `hac.html` in your web browser to access the web interface.

### Usage

1. Enter your symptoms in the input field.
2. Click the "Analyze" button to send the symptoms to the Flask API.
3. View the analysis result displayed on the web page.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.
