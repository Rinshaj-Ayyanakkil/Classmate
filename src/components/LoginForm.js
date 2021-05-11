import "../css/Base.css";
import "../css/UI-Components.css";
import useForm from "../hooks/useForm";

export default function LoginBox(props) {
	const [formInputs, changeFormInputs] = useForm({ username: ``, password: `` });

	const handleSubmit = async (event) => {
		event.preventDefault();
		props.onLogin(formInputs.username, formInputs.password);
	};

	return (
		<div className="form-box login-form">
			<h1>Login</h1>
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
					<button className="submit-button" type="submit">
						Log in
					</button>
				</div>
			</form>
		</div>
	);
}
