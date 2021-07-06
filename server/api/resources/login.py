from flask_restful import Resource, marshal, fields, abort, reqparse
from server.models.student import StudentModel
from server.models.login import LoginModel
from server.extensions import db, bcrypt

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument("username", type=str, help="username is required", required=True, location="json")
parser.add_argument("password", type=str, help="password is required", required=True, location="json")
parser.add_argument("studentId", type=int, help="student id is required", location="json")

resource_fields = {
    "id": fields.Integer(attribute="user_id"),
    "rollNo": fields.Integer(attribute="roll_number"),
    "username": fields.String,
    "password": fields.String,
    "isAdmin": fields.Boolean(attribute="is_admin"),
}


class Login(Resource):
    def post(self):
        args = parser.parse_args()
        req_username = args["username"]
        req_password = args["password"]
        result = LoginModel.query.filter_by(username=req_username).first()

        # user not found
        if not result:
            abort(404, message="user not found")

        result = marshal(result, fields)

        password = result["password"]

        # password not match
        if not bcrypt.check_password_hash(password, req_password):
            abort(401, message="password invalid")

        return {k: v for k, v in result.items() if k in ("id, isAdmin")}, 200

    def put(self):
        args = parser.parse_args()
        roll_number = args["studentId"]

        # checking if the roll number exists
        is_valid_id = (
            StudentModel.query.with_entities(StudentModel.roll_number).filter_by(roll_number=roll_number).first()
            is not None
        )
        if not is_valid_id:
            abort(400, message="student doesn't exists")

        # checking if student is already registered
        is_already_registered = (
            LoginModel.query.with_entities(LoginModel.user_id).filter_by(roll_number=roll_number).first() is not None
        )
        if is_already_registered:
            abort(409, message="student already registered")

        username = args["username"]
        password = args["password"]
        hashed_password = bcrypt.generate_password_hash(password)
        login = LoginModel(roll_number=roll_number, username=username, password=hashed_password)
        db.session.add(login)
        db.session.commit()
        response = marshal(login, resource_fields)
        return {k: v for k, v in response.items() if k in ("id, isAdmin")}, 200
