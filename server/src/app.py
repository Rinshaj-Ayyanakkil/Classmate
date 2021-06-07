from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, abort, marshal, marshal_with_field, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import create_engine
from sqlalchemy.orm import session
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_bcrypt import Bcrypt

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATAdb.Model_URI"] = "mysql://rinshaj:@localhost/cs_ihrd"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

api = Api(app)

engine = create_engine("mysql+pymysql://rinshaj:@localhost/cs_ihrd")
Base = declarative_base(engine)


class StudentModel(Base):
    __tablename__ = "student_info"
    __table_args__ = {"autoload": True}


class LoginModel(Base):
    __tablename__ = "login"
    __table_args__ = {"autoload": True}


class GroupModel(Base):
    __tablename__ = "groups"
    __table_args__ = {"autoload": True}


class TeamModel(Base):
    __tablename__ = "teams"
    __table_args__ = {"autoload": True}


class TeamMemberModel(Base):
    __tablename__ = "team_members"
    __table_args__ = {"autoload": True}


def loadSession():
    """"""
    metadata = Base.metadata
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def row_to_dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d


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
        session = loadSession()
        result = session.query(StudentModel).all()
        return result


login_cred_parser = reqparse.RequestParser(bundle_errors=True)
login_cred_parser.add_argument("username", type=str, help="username is required", required=True, location="json")
login_cred_parser.add_argument("password", type=str, help="password is required", required=True, location="json")
login_cred_parser.add_argument("studentId", type=int, help="student id is required", location="json")


class Login(Resource):
    def post(self):
        session = loadSession()
        args = login_cred_parser.parse_args()
        req_username = args["username"]
        req_password = args["password"]
        result = (
            session.query(LoginModel.password, LoginModel.student_id, LoginModel.user_type)
            .filter_by(username=req_username)
            .first()
        )

        # user not found
        if not result:
            return {"user": None}

        password = result[0]

        # password not match
        if not bcrypt.check_password_hash(password, req_password):
            return {"user": {"type": None}}

        student_id = result[1]
        user_type = result[2]
        return {"user": {"type": user_type, "id": student_id}}

    def put(self):
        session = loadSession()
        args = login_cred_parser.parse_args()
        student_id = args["studentId"]

        # checking if the roll number exists
        is_valid_id = session.query(StudentModel.roll_number).filter_by(roll_number=student_id).first() is not None
        if not is_valid_id:
            abort(400, message="Student doesn't exists")

        # checking if student is already registered
        is_already_registered = session.query(LoginModel.user_id).filter_by(student_id=student_id).first() is not None
        if is_already_registered:
            abort(409, message="Student already registered")

        username = args["username"]
        password = args["password"]
        hashed_password = bcrypt.generate_password_hash(password)
        login = LoginModel(student_id=student_id, username=username, password=hashed_password, user_type="student")
        session.add(login)
        session.commit()
        return {"user_id": login.user_id}


team_member_fields = {
    "id": fields.Integer(attribute="member_id"),
    "content": fields.String(attribute="member"),
}

team_fields = {
    "id": fields.Integer(attribute="team_id"),
    "title": fields.String(attribute="team_name"),
    "members": fields.List(fields.Nested(team_member_fields)),
}

group_fields = {
    "id": fields.Integer(attribute="group_id"),
    "title": fields.String(attribute="group_name"),
    "teams": fields.List(fields.Nested(team_fields)),
}


class Groups(Resource):
    @marshal_with(group_fields, envelope="groups")
    def get(self):
        session = loadSession()

        # group = [
        #     {
        #         "group_id": 1,
        #         "group_name": "g_name",
        #         "teams": [
        #             {
        #                 "team_id": 3423,
        #                 "team_name": "team1",
        #                 "members": [
        #                     {"member": 4, "name": "fa"},
        #                     {"member": 5, "name": "gta"},
        #                     {"member": 6, "name": "skyrim"},
        #                 ],
        #             },
        #             {
        #                 "team_id": 2343,
        #                 "team_name": "team2",
        #                 "members": [
        #                     {"member": 54, "name": "dream"},
        #                     {"member": 56, "name": "techno"},
        #                     {"member": 63, "name": "tommy"},
        #                 ],
        #             },
        #             {
        #                 "team_id": 5345,
        #                 "team_name": "team3",
        #                 "members": [
        #                     {"member": 38, "name": "supes"},
        #                     {"member": 39, "name": "bats"},
        #                     {"member": 41, "name": "ww"},
        #                 ],
        #             },
        #         ],
        #     },
        #     {
        #         "group_id": 1,
        #         "group_name": "g_name",
        #         "teams": [
        #             {
        #                 "team_id": 3423,
        #                 "team_name": "team1",
        #                 "members": [
        #                     {"member": 4, "name": "fa"},
        #                     {"member": 5, "name": "gta"},
        #                     {"member": 6, "name": "skyrim"},
        #                 ],
        #             },
        #             {
        #                 "team_id": 2343,
        #                 "team_name": "team2",
        #                 "members": [
        #                     {"member": 54, "name": "dream"},
        #                     {"member": 56, "name": "techno"},
        #                     {"member": 63, "name": "tommy"},
        #                 ],
        #             },
        #             {
        #                 "team_id": 5345,
        #                 "team_name": "team3",
        #                 "members": [
        #                     {"member": 38, "name": "supes"},
        #                     {"member": 39, "name": "bats"},
        #                     {"member": 41, "name": "ww"},
        #                 ],
        #             },
        #         ],
        #     },
        # ]
        groups = session.query(GroupModel).all()
        teams = session.query(TeamModel).all()
        team_members = session.query(TeamMemberModel).all()

        res = []
        for group in groups:
            res.append(marshal(group, group_fields))

        return res


api.add_resource(Students, "/students")
api.add_resource(Login, "/login")
api.add_resource(Groups, "/groups")


if __name__ == "__main__":
    app.run(debug=True)
