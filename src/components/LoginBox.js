import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { useHistory } from "react-router-dom";

export default function LoginBox() {
	const [formInputs, changeFormInputs] = useForm({ username: ``, password: `` });
	const [loginError, setLoginError] = useState(null);
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const username = formInputs.username;
		const password = formInputs.password;

		try {
			const res = await fetch("http://127.0.0.1:5000/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ username: username, password: password }),
			});
			const data = await res.json();

			if (!data.user) {
				setLoginError("user not found");
				return;
			}

			if (!data.user.type) {
				setLoginError("incorrect password");
				return;
			}

			setLoginError(null);
			history.push({
				pathname: "/home",
				state: { user_id: data.user.type },
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`login-box`}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				{loginError && <div className="field error">{loginError}</div>}
				<div className={`field`}>
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
				<div className={`field`}>
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
					<button className="login-button" type="submit">
						Log in
					</button>
				</div>
			</form>
		</div>
	);
}
