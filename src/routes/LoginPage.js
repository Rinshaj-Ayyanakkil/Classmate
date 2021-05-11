import React from "react";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function LoginPage({ setAuth }) {
	const [loginError, setLoginError] = useState(null);

	const handleLogin = async (username, password) => {
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
			setAuth(true);
		} catch (error) {
			setLoginError("Sorry, something went wrong");
		}
	};

	return (
		<div className="page-container">
			<LoginForm onLogin={handleLogin} loginError={loginError} />
		</div>
	);
}
