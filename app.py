from flask import Flask, render_template, jsonify, request
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
    cur.execute('''SELECT name, score FROM userScore ORDER BY score DESC LIMIT 10''')
    rv = cur.fetchall()
    return jsonify(rv)

testObject = {
    "name": "deeter",
    "age": 26
    }

print testObject["name"]
print testObject["age"]

@app.route("/newscore", methods=["POST"])
def newScore():
    data = request._get_current_object
    cur = mysql.connect().cursor()
    playerName = data["playerName"]
    playerScore = data["playerScore"]
    cur.execute('''INSERT INTO `snakeGame`.`userScore` (`name`, `score`) VALUES ('%s', '%s');'''%(playerName,playerScore))
    return
 
if __name__ == "__main__":
    app.run()