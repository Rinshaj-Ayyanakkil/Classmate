import React from "react";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function LoginPage({ setAuth }) {
	const [loginError, setLoginError] = useState(null);

	const handleLogin = async (username, password) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ username: username, password: password }),
			});

			if (response.ok) {
				setLoginError(null);

				// const data = await response.json();
				setAuth(true);
				return;
			}

			if (response.status === 404) {
				setLoginError("user not found");
				return;
			}

			if (response.status === 409) {
				setLoginError("incorrect password");
				return;
			}

			throw new Error("Unexpected Error");
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
