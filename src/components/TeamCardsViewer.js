import "../css/Base.css";
import "../css/UI-Components.css";
import React from "react";
import TeamCard from "./TeamCard";
import { useTeams } from "../routes/TeamManagerPage";
import { generateKey } from "../Globals";
import { ACTIONS } from "../routes/TeamManagerPage";

export default function TeamCardsViewer({ addTeamCard }) {
	const [teams, dispatch] = useTeams();

	const changeTitle = (id, newTitle) => {
		let titleError = null;
		newTitle = newTitle.trim().toUpperCase();
		// checking if the new title already exists (case insensitive)
		if (teams.map((team) => team.id !== id && team.title).includes(newTitle)) {
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
		dispatch({
			type: ACTIONS.CHANGE_TEAM_TITLE,
			payload: { id: id, title: newTitle },
		});
		return true;
	};

	return (
		<div className="team-cards-container">
			{teams.map((team) => (
				<TeamCard
					team={team}
					key={generateKey(team.id)}
					onChangeTitle={changeTitle}
				/>
			))}
			<div className="add-team-card" onClick={addTeamCard}>
				+
			</div>
		</div>
	);
}
