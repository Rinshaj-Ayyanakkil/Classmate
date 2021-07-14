from server.extensions import db
from sqlalchemy.orm import backref


class StudentModel(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    roll_number = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    register_number = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date)
    phone_number = db.Column(db.String(255))
    address = db.Column(db.String(255))
    blood_group = db.Column(db.String(255))
    hss_name = db.Column(db.String(255))
    father_name = db.Column(db.String(255))
    mother_name = db.Column(db.String(255))
    sex = db.Column(db.String(255))

    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
