import "../css/Base.css";
import "../css/UI-Components.css";
import React from "react";

export default function Biodata(props) {
	return (
		<div className="field">
			<div className="label">{props.label}</div>
			<div className="value">{props.value || `N/A`}</div>
		</div>
	);
}
