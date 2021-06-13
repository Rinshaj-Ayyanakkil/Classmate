import React, { useState, useEffect } from "react";
import GroupViewer from "./GroupViewer";
import { generateKey } from "../Globals";

export default function SavedGroups() {
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

	const changeGroupTitle = (id, newTitle) => {
		let titleError = null;
		newTitle = newTitle.trim();
		// checking if the new title already exists (case insensitive)
		if (
			groups
				.map((group) => group.id !== id && group.title.toLowerCase())
				.includes(newTitle.toLowerCase)
		) {
			titleError = `${newTitle} already exists!`;
		}
		// checking if new title above 250 characters
		if (newTitle.length > 250) {
			titleError = `Title too long!`;
		}
		// checking if new title is blank
		if (!newTitle || /^\s*$/.test(newTitle)) {
			titleError = `Title cannot be empty!`;
		}
		// handling error in title
		if (titleError) {
			window.alert(titleError);
			return false;
		}
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
			{groups.map((group) => (
				<GroupViewer
					group={group}
					onChangeTitle={changeGroupTitle}
					key={generateKey(group.id)}
				/>
			))}
		</div>
	);
}
