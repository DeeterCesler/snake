from flask import Flask, render_template, jsonify, request
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '0vB!Metzger'
app.config['MYSQL_DATABASE_DB'] = 'snakeGame'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
 
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/scoreboard")
def scores():
    cursor.execute('''SELECT name, score FROM userScore ORDER BY score DESC LIMIT 10''')
    rv = cursor.fetchall()
    return jsonify(rv)

@app.route("/newscore", methods=["POST"])
def newScore():
    content = request.get_json()
    playerName = content["playerName"]
    playerScore = content["playerScore"]
    cursor.execute('''INSERT INTO `snakeGame`.`userScore` (`name`, `score`) VALUES ('%s', '%s');'''%(playerName,playerScore))
    conn.commit()
    # not sure what i'm supposed to return
    rv = cursor.fetchall()
    return jsonify(rv)
 
if __name__ == "__main__":
    app.run()