from flask import Flask, render_template, session
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sign_up')
def sign_up():
    pass


if __name__ == '__main__':
    app.run(debug=True)
