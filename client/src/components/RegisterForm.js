import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useStudents } from "../contexts/StudentsContext";
import Form from "./FormComponents/Form";
import InputField from "./FormComponents/InputField";
import FormButton from "./FormComponents/FormButton";
import SelectField from "./FormComponents/SelectField";

export default function RegisterForm({ onRegister, registrationError }) {
	const [ids, setIds] = useState([]);
	const students = useStudents();

	useEffect(() => {
		students ? setIds(students.map((student) => student.rollNo)) : setIds([]);
	}, [students]);

	const formFields = {
		id: {
			name: "id",
			value: ids[0] || ``,
		},
		username: {
			name: "username",
			initialValue: ``,
			validations: [
				{ pattern: /^.{1,}$/, message: `username cant be empty` },
				{
					pattern: /^.{1,250}$/,
					message: `username must be less than 250 characters`,
				},
				{ pattern: /^\S*$/, message: `username should not contain spaces` },
			],
		},
		password: {
			name: "password",
			initialValue: ``,
			validations: [
				{
					pattern: /^.{8,}$/,
					message: `password must contain minimum 8 characters `,
				},
			],
		},
		confirmPassword: {
			name: "confirmPassword",
			initialValue: ``,
			validations: [],
		},
	};

	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);

	return (
		<div className="register-form form-box">
			<div className="header">
				{" "}
				<div className="error">{registrationError}</div>
				<h1>Sign Up</h1>
				<div className="error">{registrationError}</div>
			</div>

			<div className="content">
				<Form onSubmit={() => onRegister(formInputs)}>
					<SelectField
						label="Select your id"
						name={formFields.id.name}
						value={formFields.id}
						onChange={changeFormInputs}
						isRequired={true}
					>
						{ids.map((id) => (
							<option key={generateKey(id)}>{id}</option>
						))}
					</SelectField>
					<InputField
						type="text"
						label="Username"
						placeholder="Username"
						name={formFields.username.name}
						value={formInputs.username}
						onChange={changeFormInputs}
						isRequired={true}
						error={formErrors.username}
					/>
					<InputField
						type="password"
						label="Password"
						placeholder="password"
						name={formFields.password.name}
						value={formInputs.password}
						onChange={changeFormInputs}
						isRequired={true}
						error={formErrors.password}
					/>
					<InputField
						type="password"
						label="Confirm Password"
						placeholder="re-type password"
						name={formFields.confirmPassword.name}
						value={formInputs.confirmPassword}
						onChange={changeFormInputs}
						isRequired={true}
						error={formErrors.confirmPassword}
					/>
					<FormButton
						type="submit"
						text="Login"
						isEnabled={Object.values(formErrors).every((error) => !error)}
					/>
				</Form>
			</div>

			<div className="footer">
				<div className="link">
					<Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
}
