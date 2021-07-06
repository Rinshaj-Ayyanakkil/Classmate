from ..extensions import db


class ClassModel(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    students = db.relationship("StudentModel", backref="classes", lazy="dynamic")
