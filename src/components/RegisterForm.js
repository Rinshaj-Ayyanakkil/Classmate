import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";

export default function RegisterForm() {
	const [formInputs, changeFormInputs] = useForm({
		id: ``,
		username: ``,
		password: ``,
		confirmPassword: ``,
	});

	const [response] = useFetch(`${process.env.REACT_APP_SERVER_URL}/ids`);
	const [ids, setIds] = useState([]);

	useEffect(() => (response ? setIds(response.ids) : setIds([])), [response]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="register-form form-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label>Select your register number</label>
					<select
						name="password"
						type="password"
						value={formInputs.password}
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
