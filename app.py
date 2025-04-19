from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data for the landing page
POPULAR_GAMES = [
    {"id": 1, "name": "Valorant", "image": "valorant.jpg"},
    {"id": 2, "name": "League of Legends", "image": "lol.jpg"},
    {"id": 3, "name": "CS:GO", "image": "csgo.jpg"},
    {"id": 4, "name": "Fortnite", "image": "fortnite.jpg"},
]

FEATURED_SERVICES = [
    {"id": 1, "title": "Account Trading", "description": "Buy and sell game accounts safely"},
    {"id": 2, "title": "Boosting Services", "description": "Professional boosting for all games"},
    {"id": 3, "title": "Currency Exchange", "description": "Trade in-game currency securely"},
]

@app.route('/api/popular-games', methods=['GET'])
def get_popular_games():
    return jsonify(POPULAR_GAMES)

@app.route('/api/featured-services', methods=['GET'])
def get_featured_services():
    return jsonify(FEATURED_SERVICES)

if __name__ == '__main__':
    app.run(debug=True) 