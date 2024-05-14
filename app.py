from flask import Flask, request, jsonify, send_from_directory
import pickle
import numpy as np
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Specify the file path to the pickled model
model_path = './random_forest_regression_model.pkl'

try:
    # Load the pickled model
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Model file not found:", model_path)
    # Handle the error gracefully (e.g., display an error message to the user)
    model = None

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route("/predict", methods=['POST'])
def predict():
    if model is None:
        error_msg = "Error: Model not found. Please contact the administrator."
        logger.error(error_msg)
        return jsonify({"prediction_text": error_msg}), 500

    if request.is_json:
        # If request data is JSON format
        form_data = request.json
    else:
        # If request data is form data
        form_data = request.form

    Year = int(form_data.get('Year'))
    Present_Price = float(form_data.get('Present_Price'))
    Kms_Driven = int(form_data.get('Kms_Driven'))
    Owner = int(form_data.get('Owner'))
    Fuel_Type_Petrol = 1 if form_data.get('Fuel_Type_Petrol') == 'Petrol' else 0
    Seller_Type_Individual = 1 if form_data.get('Seller_Type_Individual') == 'Individual' else 0
    Transmission_Mannual = 1 if form_data.get('Transmission_Mannual') == 'Mannual' else 0

    Year = 2020 - Year
    Kms_Driven2 = np.log(Kms_Driven)

    # Perform prediction using the model
    prediction = model.predict([[Present_Price, Kms_Driven2, Owner, Year, 0, Fuel_Type_Petrol, Seller_Type_Individual, Transmission_Mannual]])
    output = round(prediction[0], 2)

    # Print the prediction
    logger.info("Prediction: %s", output)

    # Return a success response
    return jsonify({"prediction_text": "You Can Sell The Car at {}".format(output)})

if __name__ == "__main__":
    app.run(debug=True)