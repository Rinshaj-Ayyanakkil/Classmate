import React from "react";
import LoginBox from "../components/LoginBox";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
	const history = useHistory();

	const handleLogin = (inputs) => {
		if (inputs.username === "ra" && inputs.password === "1234") {
			history.push("/home");
		}
		const x = null;
		console.log(4 / x);
	};

	return (
		<div className="page-container">
			<LoginBox onSubmit={handleLogin} />
		</div>
	);
}
