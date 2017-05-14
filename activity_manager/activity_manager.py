from flask import Flask
from pony.orm import *
app = Flask(__name__)
# Import db models
import models
# Import flask resources
from views import register as view_register

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    # Register models and bind db session with app session
    models.register_models(app)
    # Register manager
    models.register_manager(app)
    # Register resources
    view_register.register_resources(app, '/api')
    app.run(port=3000)
