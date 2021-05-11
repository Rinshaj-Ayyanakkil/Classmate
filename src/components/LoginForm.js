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
		<div className={`login-box`}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				{props.loginError && <div className="field error">{props.loginError}</div>}
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
					<button className="login-button" type="submit">
						Log in
					</button>
				</div>
			</form>
		</div>
	);
}
