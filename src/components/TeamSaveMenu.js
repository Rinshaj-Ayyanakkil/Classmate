import React, { useEffect, useMemo } from "react";
import { useTeams } from "../routes/TeamManagerPage";
import useForm from "../hooks/useForm";
import Form from "./FormComponents/Form";
import InputField from "./FormComponents/InputField";
import FormButton from "./FormComponents/FormButton";
import useFetch from "../hooks/useFetch";

export default function TeamSaveMenu() {
	const formFields = {
		title: {
			name: "title",
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

	const [teams] = useTeams();

	// deriving and memoizing the group
	const group = useMemo(
		() => ({
			title: formInputs.title,
			teams: teams.map((team) => {
				return {
					...team,
					members: team.members.map((member) => {
						return { roll_number: member.id };
					}),
				};
			}),
		}),
		[formInputs.title, teams]
	);

	const request = useMemo(
		() => ({
			url: `${process.env.REACT_APP_SERVER_URL}/groups`,
			options: {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({
					group: group,
				}),
			},
		}),
		[group]
	);
	const [response, isLoading, fetchData] = useFetch(request);

	useEffect(() => {
		if (response) {
			window.alert("Team Saved!");
		}
	}, [response]);

	const saveTeams = async () => {
		fetchData();
	};

	return (
		<div className="team-save-men">
			<div className="header">
				<h1>Save Group</h1>
				{isLoading && `Saving... please wait..`}
			</div>
			<div className="content">
				<Form onSubmit={saveTeams}>
					<InputField
						type="text"
						label="Group Name"
						placeholder="Group Name"
						name={formFields.title.name}
						value={formInputs.title}
						onChange={changeFormInputs}
						error={formErrors.title}
						isRequired={true}
					/>
					<FormButton
						type="submit"
						text="Save"
						isEnabled={Object.values(formErrors).every((error) => !error)}
					/>
				</Form>
			</div>
		</div>
	);
}
