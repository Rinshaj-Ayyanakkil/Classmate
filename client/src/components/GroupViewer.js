import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import TeamViewer from "./TeamViewer";

export default function GroupViewer({ teams }) {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const fetchSavedGroups = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/groups`, {
					method: "GET",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				});
				if (response.ok) {
					const data = await response.json();
					setGroups(data?.groups);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchSavedGroups();
	}, []);

	return (
		<div className="group-view-container">
			<h1>Saved Groups</h1>
			{groups.map((group) => (
				<div className="group-view" key={generateKey(group.id)}>
					<h1>{group.title}</h1>
					<TeamViewer teams={group.teams} />
				</div>
			))}
		</div>
	);
}
