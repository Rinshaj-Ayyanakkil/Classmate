import React, { useState } from "react";
import { useTeams } from "../routes/TeamManagerPage";
import useForm from "../hooks/useForm";

export default function TeamSaveMenu() {
	const [teams] = useTeams();
	const [isLoading, setLoading] = useState(false);

	const formFields = {
		groupName: {
			name: "groupName",
			initialValue: ``,
			validations: [
				{ pattern: /^.{1,}$/, message: `group name cant be empty` },
				{
					pattern: /^.{1,250}$/,
					message: `name too large`,
				},
			],
		},
	};
	const [formInputs, changeFormInputs, formErrors] = useForm(formFields);

	const saveTeams = async (event) => {
		event.preventDefault();

		setLoading(true);
		const group = {
			title: formInputs.groupName,
			teams: teams.map((team) => {
				return {
					...team,
					members: team.members.map((member) => {
						return { roll_number: member.id };
					}),
				};
			}),
		};

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/groups`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({ group: group }),
			});
			if (response.ok) {
				window.alert(`Team Saved`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="team-save-menu">
			<div className="header">
				<h1>Save Group</h1>
			</div>
			{isLoading && `Saving... please wait..`}
			<form className="form-box" onSubmit={saveTeams}>
				<div className="field">
					<input
						name={formFields.groupName.name}
						placeholder="Group Name"
						value={formInputs.groupName}
						onChange={changeFormInputs}
					/>
				</div>
				<span className="error">{formErrors.groupName}</span>
				<button type="submit" disabled={formErrors.groupName}>
					Save
				</button>
			</form>
		</div>
	);
}
