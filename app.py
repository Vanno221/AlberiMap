from datetime import datetime

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db_name = 'Alberi.db'


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///static/' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Alberi(db.Model):
    __tablename__ = 'features'

    ID = db.Column(db.Integer, primary_key=True)
    CODSITO_AL = db.Column(db.Integer)
    QUARTIERE = db.Column(db.Integer)
    SPECIE = db.Column(db.String)


@app.route("/")
def home():
    return render_template("home.html")

# New functions
@app.route("/about/")
def about():
    return render_template("about.html")

@app.route("/contact/")
def contact():
    return render_template("contact.html")

@app.route("/testdb/")
def test_db():
    try:
        alberi = Alberi.query.filter_by(QUARTIERE=4).all()
        alberi_text = '<ul>'
        for albero in alberi:
            alberi_text += '<li>' + albero.QUARTIERE + ', ' + albero.SPECIE + '</li>'
        alberi_text += '</ul>'
        return alberi_text
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text
