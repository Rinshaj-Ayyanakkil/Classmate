from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class StudentModel(db.Model):
    __tablename__ = "students_details"

    roll_number = db.Column(db.Integer, primary_key=True)
    register_number = db.Column(db.String(255))
    name = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date)
    phone_number = db.Column(db.String(255))
    address = db.Column(db.String(255))
    blood_group = db.Column(db.String(255))
    hss_name = db.Column(db.String(255))
    father_name = db.Column(db.String(255))
    mother_name = db.Column(db.String(255))
    sex = db.Column(db.String(255))


class LoginModel(db.Model):
    __tablename__ = "login"

    user_id = db.Column(db.Integer, primary_key=True)
    roll_number = db.Column(db.Integer, db.ForeignKey("students_details.roll_number"), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=0)


class GroupModel(db.Model):
    __tablename__ = "groups_info"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    teams = db.relationship("TeamModel", back_ref="groups_info", lazy="dynamic")


class TeamModel(db.Model):
    __tablename__ = "teams_info"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey("groups_info.id"), nullable=False)
    team_members = db.relationship("TeamMemberModel", back_ref="teams_info", lazy="dynamic")


class TeamMemberModel(db.Model):
    __tablename__ = "team_members"

    id = db.Column(db.Integer, primary_key=True)
    roll_number = db.Column(db.Integer, db.ForeignKey("students_details.roll_number"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams_info.id"), nullable=False)
