from flask import Blueprint
from server.extensions import api_obj
from server.api.resources.students import Students
from server.api.resources.login import Login
from server.api.resources.groups import Groups

api_bp = Blueprint("api_bp", __name__, url_prefix="/api")

api_obj.add_resource(Students, "/students")
api_obj.add_resource(Login, "/login")
api_obj.add_resource(Groups, "/groups")
