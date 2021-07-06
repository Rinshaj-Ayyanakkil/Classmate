from flask_restful import Resource, marshal_with, fields, reqparse, abort
from ..models.student import StudentModel
from ..models.group import GroupModel
from ..models.team import TeamModel
from ..models.team_member import TeamMemberModel
from ..extensions import db

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument("group", type=dict, help="username is required", required=True, location="json")

team_member_fields = {
    "id": fields.Integer(attribute="roll_number"),
    "content": fields.String(
        attribute=lambda x: StudentModel.query.filter(StudentModel.roll_number == x.roll_number).first().name
    ),
}

team_fields = {
    "id": fields.Integer,
    "title": fields.String,
    "members": fields.List(fields.Nested(team_member_fields), attribute="team_members"),
}

group_fields = {
    "id": fields.Integer,
    "title": fields.String,
    "teams": fields.List(fields.Nested(team_fields)),
}


class Groups(Resource):
    @marshal_with(group_fields, envelope="groups")
    def get(self):
        groups = GroupModel.query.all()
        return groups, 200

    def put(self):
        args = parser.parse_args()
        group = args["group"]
        teams = []
        for team in group["teams"]:
            members = []
            for member in team["members"]:
                new_member = TeamMemberModel(roll_number=member["roll_number"])
                members.append(new_member)
            new_team = TeamModel(title=team["title"], team_members=members)
            teams.append(new_team)
        new_group = GroupModel(title=group["title"], teams=teams)
        try:
            db.session.add(new_group)
            db.session.commit()
            return str(new_group), 200
        except Exception as e:
            print(e)
            abort(500, message="database error")
