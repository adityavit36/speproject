import pickle
import numpy as np
import unittest
from sklearn.metrics import mean_squared_error


# Load the trained model
with open('random_forest_regression_model.pkl', 'rb') as f:
    model = pickle.load(f)


class TestModel(unittest.TestCase):
    def setUp(self):
        # Load test data
        self.X_test = ... # Load input features
        self.y_test = ... # Load expected outputs (targets)

    def test_model_prediction(self):
        # Make predictions using the trained model
        y_pred = model.predict(self.X_test)

        # Assert that the predictions match the expected outputs
        np.testing.assert_allclose(y_pred, self.y_test, rtol=1e-3)

def test_model_mse(self):
    y_pred = model.predict(self.X_test)
    mse = mean_squared_error(self.y_test, y_pred)
    self.assertLess(mse, 0.1, "Mean Squared Error should be less than 0.1")
