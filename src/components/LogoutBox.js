import "../css/UI-Components.css";

import React from "react";

export default function LogoutBox({ onLogout, onCancel }) {
	return (
		<div className="logout-box-container">
			<div className="header">Logout</div>
			<div className="content">Are you sure?</div>
			<div className="footer">
				<button className="logout-button" onClick={onLogout}>
					log out
				</button>
				<button className="cancel-button" onClick={onCancel}>
					cancel
				</button>
			</div>
		</div>
	);
}
