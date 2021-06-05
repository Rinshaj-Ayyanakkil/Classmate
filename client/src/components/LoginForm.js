import "../css/Base.css";
import "../css/UI-Components.css";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

export default function LoginBox(props) {
	const formFields = {
		username: {
			value: ``,
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
			value: ``,
			validations: [
				{
					pattern: /^.{8,}$/,
					message: `password must contain minimum 8 characters `,
				},
			],
		},
	};
	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);

	const handleSubmit = async (event) => {
		event.preventDefault();
		props.onLogin(formInputs.username, formInputs.password);
	};

	return (
		<div className="form-box login-form">
			<div className="header">
				<h1>Login</h1>
			</div>
			<form onSubmit={handleSubmit}>
				{props.loginError && <span className="error">{props.loginError}</span>}
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
					{formErrors.username && <div className="error">{formErrors.username}</div>}
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
					{formErrors.password && <div className="error">{formErrors.password}</div>}
				</div>
				<div className={`field`}>
					<button
						className="submit-button"
						type="submit"
						disabled={
							Object.keys(formErrors).filter((field) => formErrors[field]).length !== 0
						}
					>
						Log in
					</button>
				</div>
			</form>
			<div className="footer">
				<div className="link">
					<Link to="/register">Register</Link>
				</div>
				<div className="link">
					<Link to="/reset-password">Forgot Password</Link>
				</div>
			</div>
		</div>
	);
}
