from flask import Flask, render_template, jsonify
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '0vB!Metzger'
app.config['MYSQL_DATABASE_DB'] = 'snakeGame'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
 
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/scoreboard")
def scores():
    cur = mysql.connect().cursor()
    cur.execute('''SELECT name, score FROM userScore''')
    rv = cur.fetchall()
    return jsonify(rv)
    
 
if __name__ == "__main__":
    app.run()