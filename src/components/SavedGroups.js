import React, { useState, useEffect, useMemo } from "react";
import GroupViewer from "./GroupViewer";
import { generateKey } from "../Globals";
import useFetch from "../hooks/useFetch";

export default function SavedGroups() {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		console.log(`Saved Groups rendered`);
	});

	const request = useMemo(
		() => ({
			url: `${process.env.REACT_APP_SERVER_URL}/groups`,
			options: {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			},
		}),
		[]
	);

	const [response, isLoading, fetchData] = useFetch(request, true);

	useEffect(() => {
		if (response?.groups) setGroups(response.groups);
	}, [response]);

	const handleRefresh = () => {
		console.log(`refresh`);
		fetchData();
	};

	const changeGroupTitle = (id, newTitle) => {
		// checking if the new title already exists (case insensitive)
		// if (
		// 	groups
		// 		.map((group) => group.id !== id && group.title.toLowerCase())
		// 		.includes(newTitle.toLowerCase)
		// ) {
		// 	titleError = `${newTitle} already exists!`;
		// }

		// persisting the title change
		setGroups(
			groups.map((group) => {
				return group.id === id ? { ...group, title: newTitle } : group;
			})
		);
		return true;
	};

	return (
		<div className="groups-container">
			<div className="header">
				<h2>Saved Groups</h2>
				<button onClick={handleRefresh}>refresh</button>
			</div>
			{isLoading
				? "loading..."
				: groups.map((group) => (
						<GroupViewer
							group={group}
							onChangeTitle={changeGroupTitle}
							key={generateKey(group.id)}
						/>
						// <div key={generateKey()}>
						// 	<h1>{group.title}</h1>
						// 	<ul>{group.teams.members}</ul>
						// </div>
				  ))}
		</div>
	);
}
