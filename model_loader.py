import pickle
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_model(model_path):
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        logger.info("Model loaded successfully.")
        return model
    except FileNotFoundError:
        logger.error("Model file not found: %s", model_path)
        return None

