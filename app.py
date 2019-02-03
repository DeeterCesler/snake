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
    
# tasks = [
#     {
#         'id': 1,
#         'title': u'Buy groceries',
#         'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
#         'done': False
#     },
#     {
#         'id': 2,
#         'title': u'Learn Python',
#         'description': u'Need to find a good Python tutorial on the web', 
#         'done': False
#     }
# ]

# @app.route('/todo/api/v1.0/tasks', methods=['GET'])
# def get_tasks():
#     return jsonify({'tasks': tasks})

# @app.route('/todo/api/v1.0/tasks/<int:num>', methods=['GET'])
# def get_task(num):
#     return jsonify({'tasks': tasks[num]})

 
@app.route("/members/<string:name>/")
def getMember(name):
    return name
 
if __name__ == "__main__":
    app.run()