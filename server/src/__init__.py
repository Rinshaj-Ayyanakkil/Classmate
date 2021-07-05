import os
from flask import Flask
from .extensions import db, cors, bcrypt, migrate, api_obj
from .api.main import api_bp


def create_app(config="config.py"):

    app = Flask(__name__)

    app.config.from_pyfile(config)

    db.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    api_obj.init_app(app)

    app.register_blueprint(api_bp)

    return app
