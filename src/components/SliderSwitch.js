import React from "react";

export default function SliderSwitch({ isChecked, onChange, dataOn, dataOff }) {
	return (
		<div className="switch-wrapper">
			<span>{dataOff}</span>
			<label className="switch">
				<input type="checkbox" checked={isChecked} onChange={onChange} />
				<span className="slider"></span>
			</label>
			<span>{dataOn}</span>
		</div>
	);
}
