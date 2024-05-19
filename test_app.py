import unittest
import json
from flask import Flask
from flask.testing import FlaskClient
from app import app  # Import the Flask app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test client
        self.app = app.test_client()
        self.app.testing = True

    def test_predict_success(self):
        # Test data with valid inputs
        data = {
            'Year': 2015,
            'Present_Price': 5.59,
            'Kms_Driven': 27000,
            'Owner': 0,
            'Fuel_Type_Petrol': 'Petrol',
            'Seller_Type_Individual': 'Individual',
            'Transmission_Mannual': 'Mannual'
        }
        response = self.app.post('/predict', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('You Can Sell The Car at', response.get_json()['prediction_text'])

    def test_predict_missing_model(self):
        # Simulate missing model scenario
        global model
        model_backup = model
        model = None  # Temporarily set model to None
        data = {
            'Year': 2015,
            'Present_Price': 5.59,
            'Kms_Driven': 27000,
            'Owner': 0,
            'Fuel_Type_Petrol': 'Petrol',
            'Seller_Type_Individual': 'Individual',
            'Transmission_Mannual': 'Mannual'
        }
        response = self.app.post('/predict', json=data)
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.get_json()['prediction_text'], "Error: Model not found. Please contact the administrator.")
        model = model_backup  # Restore the model

    def test_predict_invalid_input(self):
        # Test data with invalid input types
        data = {
            'Year': 2021,
            'Present_Price': 5.59,
            'Kms_Driven': 27000,
            'Owner': 0,
            'Fuel_Type_Petrol': 'Petrol',
            'Seller_Type_Individual': 'Individual',
            'Transmission_Mannual': 'Mannual'
        }
        response = self.app.post('/predict', json=data)
        self.assertEqual(response.status_code, 500)  # Expecting an error

if __name__ == '__main__':
    unittest.main()

