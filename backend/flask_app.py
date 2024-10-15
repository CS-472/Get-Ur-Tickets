from flask import Flask, request
from processing import get_total_price_from_api
from processing import warm_up_tickets, warm_up_flights
import threading

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return 'Hello World!'


@app.route('/result', methods=['POST'])
def get_best_prices():
    """
    :return: The JSON results for the front end to pick up
    """
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']
    keyword = json_request['keyword']

    result = get_total_price_from_api(origin_airport_code, keyword)

    return result


# Function to warm up the API connection in the background
def warm_up_background():
    ticket_thread = threading.Thread(target=warm_up_tickets)
    flight_thread = threading.Thread(target=warm_up_flights)

    ticket_thread.start()
    flight_thread.start()


def create_app():
    warm_up_background()
    return app
