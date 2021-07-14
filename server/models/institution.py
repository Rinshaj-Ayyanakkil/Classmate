from server.extensions import db


class InstitutionModel(db.Model):
    __tablename__ = "institutions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)

    place = db.Column(db.String(255), nullable=False)
    post = db.Column(db.String(255), nullable=False)
    pin = db.Column(db.String(255), nullable=False)

    classes = db.relationship("ClassModel", backref="classes", lazy="dynamic")
