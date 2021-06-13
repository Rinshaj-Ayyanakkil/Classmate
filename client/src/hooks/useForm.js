import { useState, useEffect, useCallback } from "react";
import useFirstRender from "./useFirstRender";

export default function useForm(fields) {
	//fields = {field: {name: str, initialValue: str, validations: [{pattern: str, msg: str}]}}

	// extracting fields and their values into an object {fieldName: initialValue}
	const initialValues = Object.entries(fields).reduce(
		(resultantObject, [fieldKey, { initialValue }]) => {
			return { ...resultantObject, [fieldKey]: initialValue };
		},
		null
	);

	const [values, setValues] = useState(initialValues);

	// extracting fields and setting initial errors as null into an object {fieldName: null}
	const initialErrors = Object.keys(fields).reduce(
		(resultantObject, fieldKey) => {
			return { ...resultantObject, [fieldKey]: null };
		},
		null
	);

	const [errors, setErrors] = useState(initialErrors);

	// extracting validations {fieldName: [validation1, validation2...]}
	const [validations] = useState(
		Object.entries(fields).reduce(
			(resultantObject, [fieldKey, { validations }]) => {
				return { ...resultantObject, [fieldKey]: validations };
			},
			null
		)
	);

	const handleChange = (e) => {
		const fieldName = e.target.name;
		setValues((values) => {
			return { ...values, [fieldName]: e.target.value };
		});
	};

	// function to validate a field
	const validate = useCallback(
		(fieldKey, validations) => {
			if (!validations) return null;
			let error = null;

			validations.every(({ pattern, message }) => {
				if (!pattern.test(values[fieldKey])) {
					error = message;
					return false;
				}
				error = null;
				return true;
			});

			return error;
		},
		[values]
	);

	const isFirstRender = useFirstRender();

	// runs validations and updates error for each time an input changes
	useEffect(() => {
		if (isFirstRender) return;

		const newErrors = {};

		Object.entries(validations).forEach(([fieldKey, validations]) => {
			newErrors[fieldKey] = validate(fieldKey, validations);
			// console.log(validations[fieldKey]);
		});
		setErrors(newErrors);
	}, [validate, values, isFirstRender, validations]);

	return [values, handleChange, errors];
}
