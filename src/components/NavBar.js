import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { generateKey } from "../Globals";

export default function NavBar(props) {
	const [isToggleClicked, setToggledClicked] = useState(false);

	return (
		<div className={`navbar`}>
			<div className="navbar-title">{props.title}</div>
			<div
				className="toggle-button"
				onClick={() => setToggledClicked(!isToggleClicked)}
			>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
			<div className={`navbar-links ${isToggleClicked ? `active` : ``}`}>
				<ul>
					{props.links.map((link) => (
						<li key={generateKey(link.name)}>
							<NavLink exact to={link.path} activeClassName={`active`}>
								{link.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
