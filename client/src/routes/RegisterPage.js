import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage({ setAuth }) {
	const [registerError, setRegisterError] = useState(null);

	const register = async (formData) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/register`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
					body: JSON.stringify({ ...formData }),
				}
			);

			if (response.ok) {
				setRegisterError(null);

				// const data = response.json()
				setAuth(true);
				return;
			}
			if (response.status === 409) {
				setRegisterError("Student is already registered");
				return;
			}

			throw new Error("Unexpected Error");
		} catch (error) {
			setRegisterError("Sorry, couldn't connect to Database");
		}
	};

	return (
		<div className="page-container">
			Register Page
			<RegisterForm handleSubmit={register} registerError={registerError} />
		</div>
	);
}
