import "../css/Base.css";
import "../css/UI-Components.css";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import InputField from "./FormComponents/InputField";
import Form from "./FormComponents/Form";
import FormButton from "./FormComponents/FormButton";

export default function LoginForm({ onLogin, loginError }) {
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

	return (
		<div className="form-box login-form">
			<div className="header">
				<h1>Login</h1>
				<div className="error">{loginError}</div>
			</div>
			<div className="content">
				<Form onSubmit={() => onLogin(formInputs)}>
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
				{/* <InputField
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
						label="password"
						placeholder="password"
						name={formFields.password.name}
						value={formInputs.password}
						onChange={changeFormInputs}
						isRequired={true}
						error={formErrors.password}
					/>

					<FormButton type="submit" text="Login" /> */}
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
	);
}
