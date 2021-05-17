import React from "react";

export default function SliderSwitch({ isChecked, onChange }) {
	return (
		<div className="switch-wrapper">
			<span>Maximum Member Count</span>
			<label className="switch">
				<input type="checkbox" checked={isChecked} onChange={onChange} />
				<span className="slider"></span>
			</label>
			<span>Team Count</span>
		</div>
	);
}
