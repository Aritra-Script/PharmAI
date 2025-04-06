# file: server.py for PharmaGenius
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

#  Gemini API key here 
GEMINI_API_KEY = ""

def call_gemini_api(user_input: str) -> str:
    """
    Sends a POST request to the Gemini API with the user's message.
    The response is expected to contain a 'reply' field in the JSON.

    If your Gemini API expects a different endpoint or payload, adjust accordingly.
    """
    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY",  # Example endpoint
            json={
                "message": user_input,
                "api_key": GEMINI_API_KEY
            },
            timeout=10  # seconds
        )
        response.raise_for_status()  # Raises an HTTPError if status != 200
        data = response.json()
        return data.get("reply", "No reply from Gemini.")
    except requests.exceptions.RequestException as e:
        print(f"[Error] Gemini API request failed: {e}")
        return "Error contacting Gemini API."

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Receives a JSON payload with { "message": "..." }
    Calls the Gemini API, then returns the AI's reply in { "reply": "..." }
    """
    data = request.get_json()
    user_message = data.get("message", "")

    gemini_reply = call_gemini_api(user_message)

    return jsonify({"reply": gemini_reply})

if __name__ == "__main__":
    # Start the Flask server on port 5000 in debug mode
    app.run(port=5000, debug=True)
