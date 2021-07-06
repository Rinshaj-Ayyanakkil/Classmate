from ..extensions import db


class GroupModel(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    teams = db.relationship("TeamModel", backref="groups", lazy="dynamic")
