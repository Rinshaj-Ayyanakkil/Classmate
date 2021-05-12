import "../css/Base.css";
import "../css/UI-Components.css";
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {
	return (
		<div className="page-container">
			<div className="dashboard">
				<div className="tab">
					<Link to="/students">Students</Link>
				</div>
				<div className="tab">
					<Link to="/team-generator">Team Generator</Link>
				</div>
			</div>
		</div>
	);
}
