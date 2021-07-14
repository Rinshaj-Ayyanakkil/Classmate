import React from "react";

export default function SelectField({
	label,
	isRequired,
	name,
	value,
	onChange,
	children,
}) {
	return (
		<div className="form-field">
			{label && <label>{label}</label>}
			<select name={name} value={value} onChange={onChange} required={isRequired}>
				{children.filter((child) => child?.type === "option")}
			</select>
		</div>
	);
}
