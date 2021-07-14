from server.extensions import db


class TeamModel(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"), nullable=False)
    team_members = db.relationship("TeamMemberModel", backref="teams", lazy="dynamic")
