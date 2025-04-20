from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

# Sample data for popular games
popular_games = [
    {
        "id": 1,
        "name": "League of Legends",
        "image": "/images/lol.jpg",
        "services": ["Boosting", "Coaching", "Account"]
    },
    {
        "id": 2,
        "name": "Valorant",
        "image": "/images/valorant.jpg",
        "services": ["Boosting", "Coaching", "Account"]
    },
    {
        "id": 3,
        "name": "CS:GO",
        "image": "/images/csgo.jpg",
        "services": ["Boosting", "Coaching", "Account"]
    },
    {
        "id": 4,
        "name": "Fortnite",
        "image": "/images/fortnite.jpg",
        "services": ["Boosting", "Coaching", "Account"]
    }
]

# Sample data for featured services
featured_services = [
    {
        "id": 1,
        "game": "League of Legends",
        "service": "Boosting",
        "description": "Professional LoL boosting service",
        "price": "$50",
        "image": "/images/lol-boost.jpg"
    },
    {
        "id": 2,
        "game": "Valorant",
        "service": "Coaching",
        "description": "Expert Valorant coaching",
        "price": "$30",
        "image": "/images/valorant-coach.jpg"
    },
    {
        "id": 3,
        "game": "CS:GO",
        "service": "Account",
        "description": "Premium CS:GO accounts",
        "price": "$100",
        "image": "/images/csgo-account.jpg"
    }
]

@app.route('/api/popular-games')
def get_popular_games():
    return jsonify(popular_games)

@app.route('/api/featured-services')
def get_featured_services():
    return jsonify(featured_services)

@app.route('/api/ai-assistant', methods=['POST'])
def ai_assistant():
    data = request.json
    user_message = data.get('message', '')
    
    try:
        # Call OpenAI API
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant for an online gaming marketplace called Eldorado. You help users with questions about gaming services, account trading, boosting, and coaching. Be friendly, professional, and concise."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # Extract the response text
        ai_response = response.choices[0].message.content
        
        return jsonify({"message": ai_response})
    except Exception as e:
        print(f"Error calling OpenAI: {str(e)}")
        # Fallback response if OpenAI fails
        return jsonify({
            "message": "I'm having trouble connecting to my AI service right now. Please try again later or contact support."
        })

if __name__ == '__main__':
    app.run(debug=True) 