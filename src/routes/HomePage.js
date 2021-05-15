import "../css/Base.css";
import "../css/UI-Components.css";
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {
	return (
		<div className="page-container">
			<div className="dashboard">
				<div className="header">
					<h1>Dashboard</h1>
				</div>
				<div className="content">
					<Link to="/students">
						{" "}
						<div className="tab">Students</div>
					</Link>

					<Link to="/team-manager">
						<div className="tab">Team Manager</div>
					</Link>
				</div>
			</div>
			<div className="footer"></div>
		</div>
	);
}
