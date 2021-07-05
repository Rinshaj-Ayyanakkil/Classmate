from ..extensions import db


class TeamMemberModel(db.Model):
    __tablename__ = "team_members"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    is_leader = db.Column(db.Boolean, nullable=False, server_default="false", default=False)
