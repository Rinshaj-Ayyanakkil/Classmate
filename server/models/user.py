from server.extensions import db


class UserModel(db.Model):
    __tablename__ = "login"

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default="false", default=False)

    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)

