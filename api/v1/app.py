#!/usr/bin/python3
"""Flask server (variable app)
"""
from flask import Flask, jsonify
from flask_cors import CORS
from models import storage
from os import getenv
from api.v1.views import app_views

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://0.0.0.0"}})  # Allow CORS for all origins on 0.0.0.0
app.register_blueprint(app_views)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

if __name__ == "__main__":
    HOST = getenv('HBNB_API_HOST', '0.0.0.0')
    PORT = int(getenv('HBNB_API_PORT', 5000))
    app.run(host=HOST, port=PORT, threaded=True)


@app.teardown_appcontext
def teardown_engine(exception):
    '''Status of your API'''
    storage.close()


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404
