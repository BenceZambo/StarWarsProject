import os
import psycopg2
import urllib
from local_config import *


def connect_db(connect_data):

    conn = None
    try:
        conn = psycopg2.connect(connect_data)
        return conn
    except Exception as error:
        print(error)
        return 'connection error'


def handle_database(query):

    result = {}
    connect_data = "dbname={0} user={1} password={2} host={3}".format(DATABASE, USER, PASSWORD, HOST)
    connection = connect_db(connect_data)
    if connection == 'connection error':
        result = 'Connection error. Server unreachable.'
        return result
    else:
        try:
            connection.autocommit = True
            cursor = connection.cursor()
            cursor.execute(query)
            if "SELECT" in query:
                result = cursor.fetchall()
            cursor.close()
        except Exception as error:
            result = error
            print(error)
        return result