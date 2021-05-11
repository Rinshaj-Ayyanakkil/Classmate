import React from "react";
import LoginBox from "../components/LoginBox";
import { useState } from "react";
import { useHistory } from "react-router";

export default function LoginPage(props) {
	const [loginError, setLoginError] = useState(null);
	const history = useHistory();

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
			history.push({
				pathname: "/home",
				state: { user_id: data.user.type },
			});
		} catch (error) {
			setLoginError("Sorry, something went wrong");
			console.log(error);
		}
	};

	return (
		<div className="page-container">
			<LoginBox onLogin={handleLogin} loginError={loginError} />
		</div>
	);
}
