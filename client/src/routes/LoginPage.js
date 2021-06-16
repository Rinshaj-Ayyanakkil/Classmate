import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import InputField from "../components/FormComponents/InputField";
import Form from "../components//FormComponents/Form";
import FormButton from "../components//FormComponents/FormButton";

export default function LoginPage({ setAuth }) {
	const formFields = {
		username: {
			name: `username`,
			initialValue: ``,
			validations: [
				{ pattern: /^.{1,}$/, message: `username cant be empty` },
				{
					pattern: /^.{1,250}$/,
					message: `username must be less than 250 characters`,
				},
				{ pattern: /^\S*$/, message: `username should not contain spaces` },
			],
		},
		password: {
			name: `password`,
			initialValue: ``,
			validations: [
				{
					pattern: /^.{8,}$/,
					message: `password must contain minimum 8 characters `,
				},
			],
		},
	};
	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);

	const [loginError, setLoginError] = useState(null);

	const request = useMemo(
		() => ({
			url: `${process.env.REACT_APP_SERVER_URL}/login`,
			options: {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(formInputs),
			},
		}),
		[formInputs]
	);

	const [response, isLoading, fetchData] = useFetch(request);

	const authorizeLogin = () => {
		fetchData();
	};

	useEffect(() => {
		if (!response) return;

		if (response.status === 200) {
			setAuth(true);
			setLoginError(null);
			return;
		}

		if (response.status === 404) {
			setLoginError("user not found");
			return;
		}

		if (response.status === 401) {
			setLoginError("incorrect password");
			return;
		}

		setLoginError("Sorry, something went wrong");
	}, [response, setAuth]);

	return (
		<div className="page-container">
			{isLoading && `...loading`}
			<div className="form-box login-form">
				<div className="header">
					<h1>Login</h1>
					<div className="error">{loginError}</div>
				</div>
				<div className="content">
					<Form onSubmit={authorizeLogin}>
						<InputField
							type="text"
							label="Username"
							placeholder="Username"
							name={formFields.username.name}
							value={formInputs.username}
							onChange={changeFormInputs}
							isRequired={true}
							error={formErrors.username}
						/>
						<InputField
							type="password"
							label="Password"
							placeholder="password"
							name={formFields.password.name}
							value={formInputs.password}
							onChange={changeFormInputs}
							isRequired={true}
							error={formErrors.password}
						/>
						<FormButton
							type="submit"
							text="Login"
							isEnabled={Object.values(formErrors).every((error) => !error)}
						/>
					</Form>
				</div>
				<div className="footer">
					<div className="link">
						<Link to="/register">Register</Link>
					</div>

					<div className="link">
						<Link to="/forgot-password">Forgot Password</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
