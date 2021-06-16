import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useStudents } from "../contexts/StudentsContext";

export default function RegisterForm({ handleSubmit, registerError }) {
	const formFields = {
		id: {
			name: "id",
			value: `1`,
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

	const [ids, setIds] = useState([]);
	const students = useStudents();

	useEffect(() => {
		console.log(students);
		students ? setIds(students.map((student) => student.rollNo)) : setIds([]);
	}, [students]);

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(formInputs);
	};

	return (
		<div className="register-form form-box">
			<div className="header">
				<h1>Sign Up</h1>
			</div>
			{registerError && <div className="error">{registerError}</div>}
			<form onSubmit={onSubmit}>
				<div className="field">
					<label>Select your register number</label>
					<select
						name={formFields.id.name}
						value={formInputs.id}
						onChange={changeFormInputs}
						required
					>
						{ids.map((id) => (
							<option key={generateKey(id)}>{id}</option>
						))}
					</select>
				</div>
				<div className="field">
					<label>username</label>
					<input
						name={formFields.username.name}
						type="text"
						value={formInputs.username}
						onChange={changeFormInputs}
						autoComplete="off"
						required
					/>
					{formErrors.username && <div className="error">{formErrors.username}</div>}
				</div>
				<div className="field">
					<label>password</label>
					<input
						name={formFields.password.name}
						type="password"
						value={formInputs.password}
						onChange={changeFormInputs}
						required
					/>
					{formErrors.password && <div className="error">{formErrors.password}</div>}
				</div>
				<div className="field">
					<label>Confirm Password</label>
					<input
						name={formFields.confirmPassword.name}
						type="password"
						value={formInputs.confirmPassword}
						onChange={changeFormInputs}
						required
					/>
					{formErrors.confirmPassword && (
						<div className="error">{formErrors.confirmPassword}</div>
					)}
				</div>
				<div className="field">
					<button
						className="submit-button"
						type="submit"
						disabled={
							Object.keys(formErrors).filter((field) => formErrors[field]).length !== 0
						}
					>
						Register
					</button>
				</div>
			</form>
			<div className="footer">
				<div className="link">
					<Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
}
