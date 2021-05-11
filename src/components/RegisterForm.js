import React from "react";
import useForm from "../hooks/useForm";

export default function RegisterForm() {
	const [formInputs, changeFormInputs] = useForm({
		id: ``,
		username: "",
		password: "",
	});

	const handleSubmit = () => {};

	return (
		<div class="register-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
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
				<div className={`field`}>
					<button className="submit-button" type="submit">
						Register
					</button>
				</div>
			</form>
		</div>
	);
}
