import React, { useState } from "react";
import { useTeams } from "../routes/TeamManagerPage";
export default function TeamSaveMenu() {
	const [teams] = useTeams();
	const [groupName, setGroupName] = useState(``);

	const saveTeams = async () => {
		const teamData = {};
		for (const key in teams) {
			teamData[key] = teams[key].map((team) => team.rollno);
		}

		const group = { group: groupName, teams: teamData };

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/teams`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(group),
			});
			if (response.ok) {
				console.log(`Team Saved`);
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
