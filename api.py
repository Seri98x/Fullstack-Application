from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from marshmallow import Schema, fields, ValidationError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'this_is_super_secret_hehe'  # Change this to a random secret
db = SQLAlchemy(app)
jwt = JWTManager(app)
first_request = True

# Define the Item model
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Create a schema for validation using Marshmallow
class ItemSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=lambda s: len(s) > 0)
    description = fields.String(required=True)
    price = fields.Float(required=True, validate=lambda p: p > 0)

# Initialize the database
@app.before_request
def create_tables():
    global first_request
    
    if first_request:
        db.drop_all()  # Drop all tables
        db.create_all()
        if User.query.count() == 0:
            admin = User(username='admin', password=generate_password_hash('admin_password'))
            db.session.add(admin)
        
        if Item.query.count() == 0:
            items = [
                Item(name='Apple', description='A sweet red fruit', price=0.5),
                Item(name='Banana', description='A long yellow fruit', price=0.3),
                Item(name='Cherry', description='A small red fruit', price=0.2),
                Item(name='Date', description='A sweet brown fruit', price=1.0),
                Item(name='Elderberry', description='A dark purple fruit', price=1.5),
                Item(name='Fig', description='A sweet purple fruit', price=0.8)
            ]
            db.session.bulk_save_objects(items)
            db.session.commit()
        first_request = False

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)  

# Authentication endpoints
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.username, expires_delta=False)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

# Item endpoints
@app.route('/api/items', methods=['GET'])
@jwt_required()
def get_items():
    items = Item.query.all()
    return items_schema.dump(items), 200

@app.route('/api/items', methods=['POST'])
@jwt_required()
def create_item():
    try:
        item_data = item_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    item = Item(**item_data)
    db.session.add(item)
    db.session.commit()
    return item_schema.dump(item), 201

@app.route('/api/items/<int:id>', methods=['GET'])
@jwt_required()
def get_item(id):
    item = Item.query.get_or_404(id)
    return item_schema.dump(item), 200

@app.route('/api/items/<int:id>', methods=['PUT'])
@jwt_required()
def update_item(id):
    item = Item.query.get_or_404(id)
    try:
        item_data = item_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    item.name = item_data['name']
    item.description = item_data['description']
    item.price = item_data['price']
    
    db.session.commit()
    return item_schema.dump(item), 200

@app.route('/api/items/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
