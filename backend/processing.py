# import os
import csv
import datetime
import requests
from encryption_functions import get_key, decrypt_file

KEY_FILE = 'key.encrypted'
CONSTANTS_FILE = 'constants.env'
TICKET_API_KEY, FLIGHT_API_KEY = decrypt_file(CONSTANTS_FILE,
                                              get_key(KEY_FILE))

# TICKET_API_KEY = os.getenv('TICKET_API_KEY')
# FLIGHT_API_KEY = os.getenv('FLIGHT_API_KEY')

# create a session for keep alive
session = requests.Session()


def warm_up_flights():
    """
    Dummy API call to warm up the ticket connection.
    """
    response = session.get(
        f'https://serpapi.com/search.json?engine=google_flights&output=json&'
        f'departure_id=MIA&arrival_id=LAS&outbound_date=2025-01-01'
        f'&return_date=2025-01-02&api_key={FLIGHT_API_KEY}'
    )
    response.raise_for_status()


def warm_up_tickets():
    """
    Dummy API call to warm up the flight connection.
    """
    response = session.get(
        f'https://app.ticketmaster.com/discovery/v2/events.json?'
        f'apikey={TICKET_API_KEY}&keyword=dummy')
    response.raise_for_status()


def get_flight_info(origin: str, destination: str, start_date: str,
                    end_date: str):
    """
    :param origin: 3-letter origin airport code
    :param destination: 3-letter destination airport code
    :param start_date: Date of outbound flight (%mm-%dd-%YYYY)
    :param end_date: Date of inbound flight (%mm-%dd-%YYYY)
    :return: SerpAPI response in JSON format
    """
    response = session.get(
        f'https://serpapi.com/search.json?engine=google_flights&output=json&'
        f'departure_id={origin}&arrival_id={destination}&outbound_date='
        f'{start_date}&return_date={end_date}&api_key={FLIGHT_API_KEY}')

    response.raise_for_status()
    return response.json()


def get_total_price_from_file(origin: str = 'LAS') -> list:
    """
    :param origin: 3-letter origin airport code
    :return: A sorted list of all the total prices (flight + ticket)
    """
    test_file = 'formula-1.txt'
    result = []

    with open(test_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            row['Price'] = float(row['Price'])

            if row['Airport'] != origin:
                date = datetime.datetime.strptime(row['Date'],
                                                  "%m-%d-%Y")
                start_date = str(date +
                                 datetime.timedelta(days=-1)).split(' ')[0]
                end_date = str(date + datetime.timedelta(days=1)).split(' ')[0]

                flights = get_flight_info(origin, row['Airport'], start_date,
                                          end_date)
                result.append((row['Price'] +
                               flights['price_insights']['lowest_price'],
                               row['Name']))
            else:
                result.append((row['Price'], row['Name']))

    result.sort()
    return result


def get_total_price_from_api(origin: str = 'LAS',
                             keyword: str = 'formula-1') -> list:
    """
    :param origin: 3-letter origin airport code
    :param keyword: Keyword to pass as
    :return: A sorted list of all the total prices (flight + ticket)
    """
    airports = {('Miami Gardens', 'Florida'): 'MIA',
                ('Montreal', 'Quebec'): 'YUL',
                ('Las Vegas', 'Nevada'): 'LAS',
                ('Austin', 'Texas'): 'AUS',
                ('México', 'Ciudad de México'): 'MEX',
                ('Albert Park', 'Victoria'): 'MEL'
                }

    result = []

    response = session.get(f'https://app.ticketmaster.com/discovery/v2/events.'
                           f'json?apikey={TICKET_API_KEY}&keyword={keyword}')
    response.raise_for_status()
    data = response.json()

    for event in data['_embedded']['events']:
        if 'url' in event and 'priceRanges' in event:
            name = event['name']
            ticket_url = event['url']
            ticket_price = float(event['priceRanges'][0]['min'])

            location = event['_embedded']['venues'][0]

            city = location['city']['name']
            state = location['state']['name']

            venue = (city, state)

            if airports[venue] == origin:
                flight_price = 0
                flight_url = flight_start_date = flight_end_date = ''

            else:
                date = event['dates']['start']['localDate']
                date = datetime.datetime.strptime(date, "%Y-%m-%d")

                flight_start_date = str(date +
                                        datetime.timedelta(days=-1)).split(
                    ' ')[0]
                flight_end_date = str(date +
                                      datetime.timedelta(days=1)).split(' ')[0]

                flights = get_flight_info(origin, airports[venue],
                                          flight_start_date, flight_end_date)

                flight_price = flights['price_insights']['lowest_price']
                flight_url = flights['search_metadata']['google_flights_url']

            result.append({'Total_Price': ticket_price + flight_price,
                           'Name': name,
                           'Venue': venue,
                           'Ticket_Price': ticket_price,
                           'Ticket_URL': ticket_url,
                           'Flight_Price': flight_price,
                           'Flight_URL': flight_url,
                           'Flight_Start_Date': flight_start_date,
                           'Flight_End Date': flight_end_date
                           })

    return sorted(result, key=lambda x: x['Total_Price'])


if __name__ == "__main__":
    print(get_total_price_from_api())
