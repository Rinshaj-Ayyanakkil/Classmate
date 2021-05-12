import { useState, useEffect } from "react";
import useFirstRender from "./useFirstRender";

export default function useForm(fields) {
	// extracting fields and their values into an object
	const initialValues = Object.keys(fields)
		.map((field) => {
			return { [field]: fields[field].value };
		})
		.reduce((obj, item) => {
			return { ...obj, ...item };
		});

	const [values, setValues] = useState(initialValues);

	// extracting fields and setting initial errors into an object
	const initialErrors = Object.keys(fields)
		.map((field) => {
			return { [field]: null };
		})
		.reduce((obj, item) => {
			return { ...obj, ...item };
		});

	const [errors, setErrors] = useState(initialErrors);

	const handleChange = (e) => {
		const fieldName = e.target.name;
		setValues({ ...values, [fieldName]: e.target.value });
	};

	const isFirstRender = useFirstRender();

	useEffect(() => {
		if (isFirstRender) {
			console.log(`first render`);
			return;
		}
		const temp = {};
		for (const field in values) {
			temp[field] = validate(field);
		}
		setErrors(temp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const validate = (fieldName) => {
		const field = fields[fieldName];
		if (!field.validations) return null;

		for (const validation of field.validations) {
			if (!validation.pattern.test(values[fieldName])) {
				return validation.message;
			}
		}
		return null;
	};

	return [values, handleChange, errors];
}
