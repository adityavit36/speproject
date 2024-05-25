import unittest
import json
from app import app
import logging

# Configure logging
logging.basicConfig(filename='test_app.log', level=logging.DEBUG, 
                    format='%(asctime)s:%(levelname)s:%(message)s')

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        logging.info('setUp complete')

    def test_predict_success(self):
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
        logging.info('test_predict_success passed')

    def test_predict_invalid_input(self):
        data = {
            'Year': '2021',
            'Present_Price': '0',
            'Kms_Driven': '0',
            'Owner': '0',
            'Fuel_Type_Petrol': 'petrol',
            'Seller_Type_Individual': '0',
            'Transmission_Mannual': '0'
        }
        response = self.app.post('/predict', json=data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Invalid input', response.get_json()['error'])
        logging.error('test_predict_invalid_input failed')

    def test_normal_scenario(self):
        # Test Case: Normal scenario with typical values
        data = {
            'Year': 2017,
            'Present_Price': 6.8,
            'Kms_Driven': 32000,
            'Owner': 1,
            'Fuel_Type_Petrol': 'Petrol',
            'Seller_Type_Individual': 'Dealer',
            'Transmission_Mannual': 'Manual'
        }
        response = self.app.post('/predict', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('You Can Sell The Car at', response.get_json()['prediction_text'])
        logging.info('test_normal_scenario passed')

if __name__ == '__main__':
    unittest.main()

