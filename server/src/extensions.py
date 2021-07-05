from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api

db = SQLAlchemy()
cors = CORS()
bcrypt = Bcrypt()
migrate = Migrate()
api_obj = Api()
