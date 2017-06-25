from flask import Flask, render_template, session, request
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from database_handler import *
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sign_up')
def sign_up():
    return render_template('signup.html')


@app.route('/signup', methods=['POST'])
def sign_up_to_database():
    get_username = request.form['username']
    get_password = request.form['password']
    get_password_again = request.form['password-again']
    query = """SELECT username
            FROM SW_user
            WHERE username = '{}'""".format(get_username)
    result = handle_database(query)
    if result == [] and get_password == get_password_again:
        password = generate_password_hash(get_password)
        query = """INSERT INTO SW_user (username, password)
                VALUES ('{0}', '{1}')""".format(get_username, password)
        handle_database(query)
        return render_template('login.html')
    else:
        return render_template('signup.html')


@app.route('/log_in', methods=['GET'])
def display_login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    get_username = request.form['username']
    query = """SELECT username 
            FROM SW_user
            WHERE username = '{0}'""".format(get_username)
    result = handle_database(query)
    if result == []:
        return render_template('login.html')
    if user_username in result[0][0]:
        get_password = request.form['password']
        query = """SELECT password
                FROM SW_user 
                WHERE username = '{0}'""".format(get_username)
        result = handle_database(query)
        saved_password = result[0][0]
        if check_password_hash(saved_password, get_password):
            session['username'] = get_username
            print(session['username'])
            return render_template('index.html')
        else:
            return render_template('index.html')
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
