import unittest
import json
from flask import Flask
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token
from api import app, db, User, Item

class FlaskTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Set up the Flask application for testing
        cls.app = app
        cls.app.config['TESTING'] = True
        cls.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        cls.client = cls.app.test_client()
      
        with cls.app.app_context():
            db.drop_all()
            db.create_all()

            # Create an admin user
            cls.admin = User(username='admin', password=generate_password_hash('admin_password'))
            db.session.add(cls.admin)
            db.session.commit()

            # Create a test token
            cls.access_token = create_access_token(identity=cls.admin.username)
            
            # Create some test items
            cls.items = [
                Item(name='Apple', description='A sweet red fruit', price=0.5),
                Item(name='Banana', description='A long yellow fruit', price=0.3)
            ]
            db.session.bulk_save_objects(cls.items)
            db.session.commit()

    @classmethod
    def tearDownClass(cls):
        # Clean up the database
        with cls.app.app_context():
            db.drop_all()

    def test_login_success(self):
        response = self.client.post('/login', json=dict(username='admin', password='admin_password'))
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', data)

    def test_get_items(self):
        response = self.client.get('/api/items', headers=dict(Authorization=f'Bearer {self.access_token}'))
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 6)

    def test_create_item(self):
        response = self.client.post('/api/items', 
                                   json=dict(name='Cherry', description='A small red fruit', price=0.2), 
                                   headers=dict(Authorization=f'Bearer {self.access_token}'))
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['name'], 'Cherry')

    def test_get_item(self):
        item_id = 1
        response = self.client.get(f'/api/items/{item_id}', headers=dict(Authorization=f'Bearer {self.access_token}'))
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['name'], 'Apple')

    def test_update_item(self):
        item_id = 1
        response = self.client.put(f'/api/items/{item_id}', 
                                   json=dict(name='Updated Apple', description='An updated sweet red fruit', price=0.6), 
                                   headers=dict(Authorization=f'Bearer {self.access_token}'))
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['name'], 'Updated Apple')

    def test_delete_item(self):
        item_id = 1
        response = self.client.delete(f'/api/items/{item_id}', headers=dict(Authorization=f'Bearer {self.access_token}'))
        self.assertEqual(response.status_code, 204)
        response = self.client.get('/api/items', headers=dict(Authorization=f'Bearer {self.access_token}'))
        data = json.loads(response.data)
        self.assertEqual(len(data), 5)  # Should only five items left since the initial has 6 items

if __name__ == '__main__':
    unittest.main()
