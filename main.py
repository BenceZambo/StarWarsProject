from flask import Flask, render_template, session
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


@app.route('/sign_up_to_database', methods=["POST"])
def sign_up_to_database():
    get_username = request.form['username']
    get_password = request.form['password']
    query = """SELECT username
            FROM SW_user
            WHERE username = '{}'""".format(username)
    result = handle_database(query)
    if result == []:
        password = generate_password_hash(user_password)
        query = """INSERT INTO SW_user (username, password)
                VALUES ('{0}', '{1}')""".format(user_username, password)
        handle_database(query)
        return render_template('login.html')
    else:
        return render_template('signup.html')



if __name__ == '__main__':
    app.run(debug=True)
