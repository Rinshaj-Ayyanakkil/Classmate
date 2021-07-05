from flask import Blueprint
from ..extensions import api_obj
from .students import Students
from .login import Login
from .groups import Groups

api_bp = Blueprint("api_bp", __name__)

api_obj.add_resource(Students, "/students")
api_obj.add_resource(Login, "/login")
api_obj.add_resource(Groups, "/groups")
