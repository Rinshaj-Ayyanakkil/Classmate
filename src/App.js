import "./css/Base.css";
import "./css/UI-Components.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import StudentsPage from "./routes/StudentsPage";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import TeamGeneratorPage from "./routes/TeamGeneratorPage";
import NavBar from "./components/NavBar";
import { Fragment, useState } from "react";

function App() {
	const [isAuthorized, setAuthorized] = useState(false);

	// navbar links
	const routes = [
		{ name: "Home", path: "/dashboard" },
		{ name: "Contact", path: "/contact" },
		{ name: "About Us", path: "/about" },
	];

	// routes with nav bar
	const RouteWithNav = (props) => {
		return (
			<Fragment>
				<NavBar title="Classmate" links={routes} />
				<Route exact={props.exact} path={props.path} component={props.component} />
			</Fragment>
		);
	};

	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Redirect to={isAuthorized ? `/dashboard` : `/login`} />
					</Route>

					<Route exact path="/login" component={LoginPage} />

					<RouteWithNav path="/dashboard">
						{!isAuthorized && <Redirect to="/login" />}
					</RouteWithNav>

					<RouteWithNav exact path="/dashboard" component={HomePage} />

					<RouteWithNav exact path="/dashboard/students" component={StudentsPage} />

					<RouteWithNav
						exact
						path="/dashboard/team-generator"
						component={TeamGeneratorPage}
					/>

					<Route path="/" render={() => <div>404</div>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
