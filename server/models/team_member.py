from server.extensions import db


class TeamMemberModel(db.Model):
    __tablename__ = "team_members"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    is_leader = db.Column(db.Boolean, nullable=False, default=False)

    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
