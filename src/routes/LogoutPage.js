import React from "react";
import LogoutBox from "../components/LogoutBox";

export default function LogoutPage({ setAuth, history }) {
	const handleLogout = () => {
		setAuth(false);
	};

	const handleCancel = () => {
		history.goBack();
	};
	return (
		<div className="page-container">
			<LogoutBox handleLogout onLogout={handleLogout} onCancel={handleCancel} />
		</div>
	);
}
