from flask import Flask
from server.extensions import db, cors, bcrypt, migrate, api_obj
from server.api import api_bp


def create_app(config="config.py"):

    app = Flask(__name__)

    app.config.from_pyfile(config)

    db.init_app(app)

    cors.init_app(app, resources={r"/*": {"origins": "*"}})
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    api_obj.init_app(api_bp)
    app.register_blueprint(api_bp, url_prefix="/api")

    return app
