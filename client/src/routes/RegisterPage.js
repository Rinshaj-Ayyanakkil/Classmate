import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage({ setAuth }) {
	const [registrationError, setRegistrationError] = useState(null);

	const registerUser = async ({ studentId, username, password }) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/register`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
					body: JSON.stringify({ studentId, username, password }),
				}
			);

			if (response.ok) {
				setRegistrationError(null);

				// const data = response.json()
				setAuth(true);
				return;
			}
			if (response.status === 409) {
				setRegistrationError("Student is already registered");
				return;
			}

			throw new Error("Unexpected Error");
		} catch (error) {
			setRegistrationError("Sorry, couldn't connect to Database");
		}
	};

	return (
		<div className="page-container">
			Register Page
			<RegisterForm
				onRegister={registerUser}
				registrationError={registrationError}
			/>
		</div>
	);
}
