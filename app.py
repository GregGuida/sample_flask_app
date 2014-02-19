import os
import sys
import json
from flask import Flask, render_template, send_from_directory, request
from flask.ext.sqlalchemy import SQLAlchemy
from geopy import geocoders

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
geocoder = geocoders.GoogleV3()

class AbstractModel():
  def to_dict(self):
    return { c.name: getattr(self, c.name) for c in self.__table__.columns }

class FavoriteLocation(db.Model,AbstractModel):
  __tablename__ = 'favorite_locations'
  id = db.Column(db.Integer, primary_key=True)
  # looked into using PostGIS but this project is 
  # suposed to take 4 hours not 4 days
  lat = db.Column(db.Float)
  lng = db.Column(db.Float)
  name = db.Column(db.String(100))
  address = db.Column(db.Text)
  
  def __init__(self, name, address):
    self.name = name 
    self.address, (self.lat, self.lng) = geocoder.geocode(address)

  def update(self, name, address):
    self.name = name
    self.address, (self.lat, self.lng) = geocoder.geocode(address)


# controllers
@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'), 'ico/favicon.ico')


@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404


@app.route("/", methods=['GET'])
def index():
  return render_template('index.html')

@app.route("/favorites")
def favorites():
  return render_template('index.html')

@app.route("/favorites/<int:id>", methods=['GET'])
def show_favorites(id):
  return render_template('index.html')

@app.route("/api/favorites", methods=['GET'])
def api_favorites():
  return json.dumps([ f.to_dict() for f in FavoriteLocation.query.all() ])

@app.route("/api/favorites/<int:id>", methods=['GET'])
def api_show_favorites(id):
  fav = FavoriteLocation.query.filter_by(id=id).first()
  return json.dumps(fav.to_dict())

@app.route("/api/favorites/<int:id>", methods=['DELETE'])
def api_destroy_favorites(id):
  fav = FavoriteLocation.query.filter_by(id=id).first()
  db.session.delete(fav)
  db.session.commit()
  return json.dumps(fav.to_dict())

@app.route("/api/favorites", methods=['POST'])
def api_new_favorites():
  post_json = json.loads(request.data)
  new_fav = FavoriteLocation(post_json["name"],post_json["address"])
  db.session.add(new_fav)
  db.session.commit()
  return json.dumps(new_fav.to_dict())

@app.route("/api/favorites/<int:id>", methods=['PUT'])
def edit_favorites(id):
  post_json = json.loads(request.data)
  fav = FavoriteLocation.query.filter_by(id=id).first()
  fav.update(post_json['name'],post_json['address'])
  db.session.commit()
  return json.dumps(fav.to_dict())


# launch
if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host='0.0.0.0', port=port)
