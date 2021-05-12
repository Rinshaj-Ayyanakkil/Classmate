import "./css/Base.css";
import "./css/UI-Components.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import StudentsPage from "./routes/StudentsPage";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import TeamGeneratorPage from "./routes/TeamGeneratorPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./routes/RegisterPage";
import { Fragment } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [isAuthorized, setAuthorized] = useLocalStorage("classmate-auth", false);

	const setAuth = (boolean) => {
		setAuthorized(boolean);
	};

	// navbar links
	const routes = [
		{ name: "Home", path: "/home" },
		{ name: "Contact", path: "/contact" },
		{ name: "About Us", path: "/about" },
	];

	// routes require authentication
	function ProtectedRoute({
		path,
		component: Component,
		componentProps,
		isAuthorized,
		...rest
	}) {
		return (
			<Fragment>
				<NavBar title="Classmate" links={routes} />
				<Route
					{...rest}
					render={(...props) =>
						isAuthorized ? (
							<Component {...props} {...componentProps} />
						) : (
							<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
						)
					}
				/>
			</Fragment>
		);
	}

	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>

					<Route
						exact
						path="/register"
						render={(props) =>
							isAuthorized ? (
								<Redirect to="/home" from="/register" />
							) : (
								<RegisterPage {...props} />
							)
						}
					/>

					<Route
						exact
						path="/login"
						render={(props) =>
							isAuthorized ? (
								<Redirect to="/home" from="/login" />
							) : (
								<LoginPage setAuth={setAuth} {...props} />
							)
						}
					/>

					<ProtectedRoute
						exact
						path="/home"
						component={HomePage}
						isAuthorized={isAuthorized}
					/>

					<ProtectedRoute
						exact
						path="/team-generator"
						component={TeamGeneratorPage}
						isAuthorized={isAuthorized}
					/>

					<ProtectedRoute
						exact
						path="/students"
						component={StudentsPage}
						isAuthorized={isAuthorized}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
