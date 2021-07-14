from server.extensions import db


class ClassModel(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    institution = db.Column(db.Integer, db.ForeignKey("institutions.id"), nullable=False)
    students = db.relationship("StudentModel", backref="classes", lazy="dynamic")
