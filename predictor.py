from flask import Flask, request, jsonify
import numpy as np
import logging
from flask_cors import CORS
from model_loader import load_model

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://65.0.248.48:3000"}})

model_path = './random_forest_regression_model.pkl'
model = load_model(model_path)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/predict", methods=['POST'])
def predict():
    if model is None:
        error_msg = "Error: Model not found. Please contact the administrator."
        logger.error(error_msg)
        return jsonify({"prediction_text": error_msg}), 500

    if request.is_json:
        form_data = request.json
    else:
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

    prediction = model.predict([[Present_Price, Kms_Driven2, Owner, Year, 0, Fuel_Type_Petrol, Seller_Type_Individual, Transmission_Mannual]])
    output = round(prediction[0], 2)

    logger.info("Prediction: %s", output)

    return jsonify({"prediction_text": "You Can Sell The Car at {}".format(output)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

