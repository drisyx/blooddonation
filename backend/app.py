from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app)

# Step 1: Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["blood_donation"]

# Step 2: Define Routes
@app.route("/api", methods=["GET"])
def home():
    return "Blood Donation Management API is running"

# Register a user
@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.json
    try:
        user = {
            "name": data["name"],
            "email": data["email"],
            "password": data["password"],
            "bloodType": data["bloodType"],
            "location": data["location"],
            "role": data["role"]
        }
        db.users.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Login a user
@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.json
    try:
        user = db.users.find_one({"email": data["email"]})
        if not user or user["password"] != data["password"]:
            return jsonify({"error": "Invalid credentials"}), 401
        user["_id"] = str(user["_id"])
        return jsonify({"message": "Login successful", "user": user})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Edit user profile
@app.route("/api/users/<user_id>", methods=["PUT"])
def edit_user(user_id):
    data = request.json
    try:
        updated_user = {
            "name": data["name"],
            "email": data["email"],
            "bloodType": data["bloodType"],
            "location": data["location"]
        }
        result = db.users.update_one({"_id": ObjectId(user_id)}, {"$set": updated_user})
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
        return jsonify({"message": "Profile updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Search donors by blood group and location
@app.route("/api/donors", methods=["GET"])
def search_donors():
    bloodType = request.args.get("bloodType")
    location = request.args.get("location")
    try:
        donors = list(db.users.find({"role": "donor", "bloodType": bloodType, "location": location}))
        for donor in donors:
            donor["_id"] = str(donor["_id"])
        return jsonify(donors)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create a blood donation request
@app.route("/api/requests", methods=["POST"])
def create_request():
    data = request.json
    try:
        donation_request = {
            "bloodType": data["bloodType"],
            "recipientName": data["recipientName"],
            "contactInfo": data["contactInfo"],
            "location": data["location"],
            "createdAt": data.get("createdAt", None)
        }
        db.requests.insert_one(donation_request)
        return jsonify({"message": "Donation request created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fetch all donation requests
@app.route("/api/requests", methods=["GET"])
def fetch_requests():
    try:
        requests = list(db.requests.find())
        for req in requests:
            req["_id"] = str(req["_id"])
        return jsonify(requests)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# List blood donation camps
@app.route("/api/events", methods=["GET"])
def list_events():
    try:
        events = list(db.events.find())
        for event in events:
            event["_id"] = str(event["_id"])
        return jsonify(events)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create a blood donation camp/event
@app.route("/api/events", methods=["POST"])
def create_event():
    data = request.json
    try:
        event = {
            "title": data["title"],
            "date": data["date"],
            "location": data["location"],
            "description": data.get("description", "")
        }
        db.events.insert_one(event)
        return jsonify({"message": "Event created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Notify users about events (Mock Notification)
@app.route("/api/notify", methods=["POST"])
def notify_users():
    data = request.json
    try:
        event_id = data["eventId"]
        event = db.events.find_one({"_id": ObjectId(event_id)})
        if not event:
            return jsonify({"error": "Event not found"}), 404
        # Mock notification
        return jsonify({"message": f"Users notified about the event: {event['title']}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Step 3: Start the server
if __name__ == "__main__":

    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
