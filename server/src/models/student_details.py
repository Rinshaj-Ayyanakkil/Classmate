from sqlalchemy.orm import backref
from ..extensions import db


class StudentDetailsModel(db.Model):
    __tablename__ = "students_details"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    student = db.relationship("Parent", backref=backref("child", uselist=False))
    register_number = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date)
    phone_number = db.Column(db.String(255))
    address = db.Column(db.String(255))
    blood_group = db.Column(db.String(255))
    hss_name = db.Column(db.String(255))
    father_name = db.Column(db.String(255))
    mother_name = db.Column(db.String(255))
    sex = db.Column(db.String(255))
