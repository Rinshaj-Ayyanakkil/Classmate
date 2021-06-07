from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, abort, marshal, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import engine
from models import db, StudentModel, LoginModel

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://rinshaj:@localhost/classmate"
db.init_app(app)

api = Api(app)

students_fields = {
    "rollNo": fields.Integer(attribute="roll_number"),
    "regNo": fields.String(attribute="register_number"),
    "name": fields.String,
    "dob": fields.DateTime(
        attribute="date_of_birth",
        dt_format="iso8601",
    ),
    "phone": fields.String(attribute="phone_number"),
    "address": fields.String,
    "bloodGroup": fields.String(attribute="blood_group"),
    "hss": fields.String(attribute="hss_name"),
    "father": fields.String(attribute="father_name"),
    "mother": fields.String(attribute="mother_name"),
    "sex": fields.String,
}


class Students(Resource):
    @marshal_with(students_fields, envelope="students")
    def get(self):
        result = StudentModel.query.all()
        return result, 200


login_cred_parser = reqparse.RequestParser(bundle_errors=True)
login_cred_parser.add_argument("username", type=str, help="username is required", required=True, location="json")
login_cred_parser.add_argument("password", type=str, help="password is required", required=True, location="json")
login_cred_parser.add_argument("studentId", type=int, help="student id is required", location="json")

login_fields = {
    "id": fields.Integer(attribute="user_id"),
    "rollNo": fields.Integer(attribute="roll_number"),
    "username": fields.String,
    "password": fields.String,
    "isAdmin": fields.Boolean(attribute="is_admin"),
}


class Login(Resource):
    def post(self):
        args = login_cred_parser.parse_args()
        req_username = args["username"]
        req_password = args["password"]
        result = LoginModel.query.filter_by(username=req_username).first()

        # user not found
        if not result:
            abort(404, message="user not found")

        result = marshal(result, login_fields)

        password = result["password"]

        # password not match
        if not bcrypt.check_password_hash(password, req_password):
            abort(401, message="password invalid")

        return {k: v for k, v in result.items() if k in ("id, isAdmin")}, 200

    def put(self):
        args = login_cred_parser.parse_args()
        roll_number = args["studentId"]

        # checking if the roll number exists
        is_valid_id = (
            StudentModel.query.with_entities(StudentModel.roll_number).filter_by(roll_number=roll_number).first()
            is not None
        )
        if not is_valid_id:
            abort(400, message="Student doesn't exists")

        # checking if student is already registered
        is_already_registered = (
            LoginModel.query.with_entities(LoginModel.user_id).filter_by(roll_number=roll_number).first() is not None
        )
        if is_already_registered:
            abort(409, message="Student already registered")

        username = args["username"]
        password = args["password"]
        hashed_password = bcrypt.generate_password_hash(password)
        login = LoginModel(roll_number=roll_number, username=username, password=hashed_password)
        db.session.add(login)
        db.session.commit()
        return {"user_id": login.user_id}, 201


api.add_resource(Students, "/students")
api.add_resource(Login, "/login")


if __name__ == "__main__":
    app.run(debug=True)
