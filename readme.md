A Fullstack project examination using React (Vite) + Flask (Backend) with Ionic Framework.

Project includes :
(Client Side) - React JS + Vite (Ionic Framework)
(Back End) - Python Flask (Deployed live at Pythonanywhere),
Postman Collection For Endpoint Testing,
Python Unit Tests (test_app.py)

Pre-requisites : 
NodeJs,
Vite,
Ionic Framework,
Flask,
Redux Toolkit,
React Router Dom,
Axios,

Instructions to run locally :

1. Install NodeJS >= 20.0
2. Install Python
3. Install Python Libraries (this can be done by simple typing pip install -r requirements.txt as I've already included requirements.txt inside the folder so that it will find all the dependencies and download them all)
4. Install React and Vite CLI
5. Run npm install to get all the dependencies (if there is an error that needs legacy dependencies then run 'npm install --legacy-peer-deps' instead and it will gather all the dependencies)
6. Run Python Flask API by 'py api.py' or 'python api.py'
7. Run client side by  'npm run dev'

Additional/s :

To test API endpoints, download Postman then use the collections included inside the folder to use the endpoints immediately (Note: the endpoint is already pointing at live flask server)

To unit test Python Flask API run the following commands (Asserts are inside the test_app.py) : 

py -m  pytest -k "test_login_success" -v

py -m  pytest -k "test_get_items" -v

py -m  pytest -k "test_create_item" -v

py -m  pytest -k "test_get_item" -v

py -m  pytest -k "test_update_item" -v

py -m  pytest -k "test_delete_item" -v


To unit test React components simply run npm test 

Three components are tested and all are mock up of the concrete components.

Live link : (https://fs-revinic-flask-ldu2nza1a-jose-maris-projects.vercel.app/)

