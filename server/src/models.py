from enum import unique
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()


class ClassModel(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    students = db.relationship("StudentModel", backref="classes", lazy="dynamic")


class StudentModel(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    roll_number = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    details = db.relationship("StudentsDetailsModel", backref="students", lazy="dynamic", uselist=False)
    user = db.relationship("LoginModel", backref="students", lazy="dynamic", uselist=False)


class StudentDetailsModel(db.Model):
    __tablename__ = "students_details"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    register_number = db.Column(db.String(255))
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

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, server_default="false", default=False)


class GroupModel(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    teams = db.relationship("TeamModel", backref="groups", lazy="dynamic")


class TeamModel(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"), nullable=False)
    team_members = db.relationship("TeamMemberModel", backref="teams", lazy="dynamic")


class TeamMemberModel(db.Model):
    __tablename__ = "team_members"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    is_leader = db.Column(db.Boolean, nullable=False, server_default="false", default=False)
