from flask import Flask, request, jsonify
from flask_cors import CORS
from hvac_model import simulate_hvac
import cv2
import base64
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow frontend (React) to access backend

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

current_students = 0


# FACE DETECTION

@app.route("/update_students", methods=["POST"])
def update_students():
    global current_students
    data = request.json

    if "students" not in data:
        return jsonify({"error": "students field missing"}), 400

    current_students = int(data["students"])

    return jsonify({
        "message": "Student count updated successfully",
        "current_students": current_students
    })


# HVAC SIMULATION ENDPOINT

@app.route("/simulate", methods=["POST"])
def simulate():
    global current_students, latest_hvac_status
    data = request.json

    if current_students == 0:
        students = int(data.get("students", 0))
    else:
        students = current_students

    result = simulate_hvac(
        initial_temp=float(data["initial_temp"]),
        outside_temp=float(data["outside_temp"]),
        students=students,
        simulation_time=int(data["simulation_time"])
    )

    latest_hvac_status = result["hvac_status_log"][-1]

    result["students_detected"] = students

    return jsonify(result)


@app.route("/hvac_status", methods=["GET"])
def hvac_status():
    return jsonify({"hvac_status": latest_hvac_status})


@app.route("/detect_faces", methods=["POST"])
def detect_faces():
    global current_students
    data = request.json
    if "image" not in data:
        return jsonify({"error": "image field missing"}), 400
    
    try:
        # Decode image
        image_data = base64.b64decode(data["image"].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        face_count = len(faces)
        current_students = face_count  
        
        return jsonify({"faces": face_count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "Backend running",
        "current_students": current_students
    })


if __name__ == "__main__":
    app.run(debug=True)
