#!/usr/bin/python3
'''api status'''

from models import storage
from flask import jsonify
from api.v1.views import app_views


@app_views.route('/status', strict_slashes=False)
def returnstuff():
    '''return stuff'''
    return jsonify({'status': 'OK'})


@app_views.route('/stats', strict_slashes=False)
def stats():
    '''JSON Responses'''
    todos = {
            'states': storage.count('State'),
            'cities': storage.count('City'),
            'amenities': storage.count('Amenity'),
            'places': storage.count('Place'),
            'reviews': storage.count('Review'),
            }
    return jsonify(todos)
