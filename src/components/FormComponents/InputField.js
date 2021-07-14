import React from "react";

export default function InputField({
	label,
	type,
	isRequired,
	placeholder,
	name,
	value,
	onChange,
	error,
}) {
	return (
		<div className="form-field">
			{label && <label>{label}</label>}
			<input
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				required={isRequired}
				placeholder={placeholder}
			/>
			{error && <span>{error}</span>}
		</div>
	);
}
