import React, { useState, useEffect, useRef } from "react";
import useForm from "../hooks/useForm";
import TeamViewer from "./TeamViewer";

export default function GroupViewer({ group, onChangeTitle }) {
	const [isEditable, setEditable] = useState(false);

	const titleRef = useRef(null);

	useEffect(() => {
		if (isEditable) {
			titleRef.current.focus();
		}
	}, [isEditable]);

	const formFields = {
		title: {
			name: `title`,
			initialValue: group?.title,
			validations: [
				{
					pattern: (title) => {
						return !(!title || /^\s*$/.test(title));
					},
					message: `Title cannot be empty!`,
				},
			],
		},
	};

	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);
	const handleChangeTitle = (event) => {
		event.preventDefault();
		const isTitleChanged = onChangeTitle(group.id, formInputs.title);
		// if title is changed successfully, editable is set false and vice versa
		setEditable(!isTitleChanged);
	};

	return (
		<div className="group-view">
			<div className="header">
				<form onSubmit={handleChangeTitle}>
					<input
						type="text"
						name={formFields.title.name}
						value={formInputs.title}
						ref={titleRef}
						onChange={changeFormInputs}
						readOnly={!isEditable}
						required
					/>
					{formErrors.title && <span>{formErrors.title}</span>}
				</form>
				{!isEditable ? (
					<button type="button" onClick={() => setEditable(true)}>
						edit
					</button>
				) : (
					<button type="submit">save</button>
				)}
			</div>
			<div className="content">
				<TeamViewer teams={group.teams} />
			</div>
		</div>
	);
}
