// AI Consultation
function analyzeSymptoms() {
    const symptoms = document.getElementById('symptom-input').value;
    if (symptoms) {
        // Display loading message
        document.getElementById('analysis-result').innerHTML = "Analyzing symptoms...";

        // Send symptoms to the Flask API
        fetch('http://localhost:5000/api/text-to-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: symptoms })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('analysis-result').innerHTML = `Result: ${data.response}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('analysis-result').innerHTML = "An error occurred while analyzing symptoms.";
        });
    } else {
        alert('Please enter symptoms.');
    }
}