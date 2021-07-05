from flask_restful import Resource, marshal_with, fields
from ..models.student import StudentModel

resource_fields = {
    "rollNo": fields.Integer(attribute="roll_number"),
    "regNo": fields.String(attribute="register_number"),
    "name": fields.String,
    "dob": fields.DateTime(
        attribute="date_of_birth",
        dt_format="iso8601",
    ),
    "phone": fields.String(attribute="phone_number"),
    "address": fields.String,
    "bloodGroup": fields.String(attribute="blood_group"),
    "hss": fields.String(attribute="hss_name"),
    "father": fields.String(attribute="father_name"),
    "mother": fields.String(attribute="mother_name"),
    "sex": fields.String,
}


class Students(Resource):
    @marshal_with(resource_fields, envelope="students")
    def get(self):
        result = StudentModel.query.all()
        return result, 200
