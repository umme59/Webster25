from flask import Flask, request, jsonify, render_template
import random
import re
from datetime import datetime, timedelta
import os.path
import pickle
import pytz
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
SCOPES = ['https://www.googleapis.com/auth/calendar'] 
CREDENTIALS_FILE = 'credentials.json'
TIME_ZONE = 'Asia/Kolkata' 

MOCK_USER_SCHEDULE = {
    "medications": [],
    "adherence_prediction": "Initial setup complete. New predictions will start tomorrow."
}

app = Flask(__name__)
def authenticate_google_calendar():
    """Handles the OAuth2 authentication flow (token.pickle for caching)."""
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            raise Exception("No valid token.pickle found. Run authentication locally first.")
            
    service = build('calendar', 'v3', credentials=creds)
    return service

def setup_google_calendar_notifications(schedule):
    """Creates calendar events and returns a success status/message."""
    try:
        service = authenticate_google_calendar()
        time_zone = pytz.timezone(TIME_ZONE)
        count = 0
        
        for med in schedule["medications"]:
            for time_str in med["times"]:
                try:
                    time_obj = datetime.strptime(time_str.upper(), '%I:%M %p').time()
                except ValueError:
                    continue

                now = datetime.now(time_zone)
                event_start = now.replace(hour=time_obj.hour, minute=time_obj.minute, second=0, microsecond=0)
                event_end = event_start + timedelta(minutes=15)

                event = {
                    'summary': f'💊 Take {med["name"]}',
                    'description': f'Time to take your {med["dosage"]} of {med["name"]}.',
                    'start': {'dateTime': event_start.isoformat(), 'timeZone': TIME_ZONE},
                    'end': {'dateTime': event_end.isoformat(), 'timeZone': TIME_ZONE},
                    'recurrence': ['RRULE:FREQ=DAILY;COUNT=365'], 
                }

                service.events().insert(calendarId='primary', body=event).execute()
                count += 1

        return True, f"Google Calendar setup complete. {count} daily reminders are set."

    except Exception as e:
        return False, f"API Error: {e}"



@app.route('/')
def home():
    """Renders the HTML file with the chatbot interface."""
    return render_template('idx.html') 


@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    """Handles general chatbot conversation based on user text input."""
    data = request.get_json()
    user_input = data.get('message', '')
    user_input_lower = user_input.lower().strip()
    patterns = {
        r"hello|hi|hey": ["Hello! Welcome to Alchemist's Grimoire. How can I assist you?"],
        r"time table|schedule|what do i need to take|give me the .* medicine": [
            "I can help with that! Please use the **Schedule Setup** button (or icon) to enter your medication details."
        ],
        r"thank you|thanks": ["You're welcome!", "Anytime."],
        r"bye|goodbye": ["Goodbye! Stay healthy and on schedule."]
    }

    for pattern, responses in patterns.items():
        if re.search(pattern, user_input_lower):
            return jsonify({'response': random.choice(responses)})

    return jsonify({'response': "I am the AI Chatbot for Alchemist's Grimoire. Ask about your 'schedule' or say 'hello'."})


@app.route('/setup_schedule', methods=['POST'])
def setup_schedule():
    """Handles the submission of the structured medication data."""
    global MOCK_USER_SCHEDULE
    
    medication_data = request.get_json()
    
    if not medication_data:
        return jsonify({'status': 'error', 'message': 'No medication data provided.'}), 400
    
    MOCK_USER_SCHEDULE["medications"] = medication_data
    success, message = setup_google_calendar_notifications(MOCK_USER_SCHEDULE)
    
    if success:
        return jsonify({
            'status': 'success', 
            'message': message,
            'schedule': MOCK_USER_SCHEDULE["medications"]
        })
    else:
        return jsonify({'status': 'error', 'message': message}), 500

if __name__ == '__main__':
    try:
        print("Attempting to generate token.pickle...")
        authenticate_google_calendar()
        print("token.pickle generated successfully! You can now revert this code.")
    except Exception as e:
        print(f"Authentication failed: {e}")
       