import React from "react";

export default function FormButton({ type, text, onClick, isEnabled = true }) {
	return (
		<div className="form-field">
			<button type={type} onClick={onClick} disabled={!isEnabled}>
				{text}
			</button>
		</div>
	);
}
