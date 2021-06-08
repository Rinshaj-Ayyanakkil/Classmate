import React, { useState } from "react";
import { useTeams } from "../routes/TeamManagerPage";
export default function TeamSaveMenu() {
	const [teams] = useTeams();
	const [groupName, setGroupName] = useState(``);

	const saveTeams = async () => {
		const group = {
			title: groupName,
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
		}
	};

	return (
		<div className="team-save-menu">
			<input
				name="groupName"
				placeholder="Group Name"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
			/>
			<button onClick={saveTeams}>Save</button>
		</div>
	);
}
