import "./css/Base.css";
import "./css/UI-Components.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import StudentsPage from "./routes/StudentsPage";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import TeamGeneratorPage from "./routes/TeamGeneratorPage";
import NavBar from "./components/NavBar";

function App() {
	// dummy navbar links
	const routes = [
		{ name: "Home", path: "/home" },
		{ name: "Contact", path: "/contact" },
		{ name: "About Us", path: "/about" },
	];

	const RouteWrapped = (props) => {
		return (
			<div>
				<NavBar title="Classmate" links={routes} />
				<Route exact={props.exact} path={props.path} component={props.component} />
			</div>
		);
	};

	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Redirect to="/login" />
					</Route>

					<Route exact path="/login" component={LoginPage} />

					<RouteWrapped exact path="/home" component={HomePage} />

					<RouteWrapped exact path="/students" component={StudentsPage} />

					<RouteWrapped exact path="/team-generator" component={TeamGeneratorPage} />

					<Route path="/" render={() => <div>404</div>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
