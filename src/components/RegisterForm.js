import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

export default function RegisterForm() {
	const formFields = {
		id: {
			value: ``,
		},
		username: {
			value: ``,
			validations: [
				{ pattern: /^.{1,}$/, message: `username cant be empty` },
				{
					pattern: /^.{1,250}$/,
					message: `username must be less than 250 characters`,
				},
				{ pattern: /^\S*$/, message: `username should not contain spaces` },
				{
					pattern: /^[a-z]+$/,
					message: `username should only contain lowercase alphabets`,
				},
			],
		},
		password: {
			value: ``,
			validations: [
				{
					pattern: /^.{8,}$/,
					message: `password must contain minimum 8 characters `,
				},
			],
		},
		confirmPassword: {
			value: ``,
			// validations: [
			// 	{ pattern: `pattern`, message: `error msg` },
			// 	{ pattern: `pattern`, message: `error msg` },
			// 	{ pattern: `pattern`, message: `error msg` },
			// ],
		},
	};

	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);

	const [response] = useFetch(`${process.env.REACT_APP_SERVER_URL}/ids`);
	const [ids, setIds] = useState([]);

	useEffect(() => (response ? setIds(response.ids) : setIds([])), [response]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formInputs);
	};

	return (
		<div className="register-form form-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label>Select your register number</label>
					<select
						name="id"
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
						name="username"
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
						name="password"
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
						name="confirmPassword"
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
					<button className="submit-button" type="submit">
						Register
					</button>
				</div>
			</form>
		</div>
	);
}
