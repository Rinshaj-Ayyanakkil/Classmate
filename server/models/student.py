from server.extensions import db
from sqlalchemy.orm import backref
from server.models.student_details import StudentDetailsModel


class StudentModel(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    roll_number = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    user = db.relationship("LoginModel", backref=backref("students", uselist=False))
    details = db.relationship("StudentDetailsModel", backref=backref("students", uselist=False))
