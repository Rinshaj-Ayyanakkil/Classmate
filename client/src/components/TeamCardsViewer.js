import "../css/Base.css";
import "../css/UI-Components.css";
import React from "react";
import TeamCard from "./TeamCard";
import { useTeams } from "../routes/TeamManagerPage";
import { generateKey } from "../Globals";

export default function TeamCardsViewer({ addTeamCard }) {
	const [teams] = useTeams();

	return (
		<div className="team-cards-container">
			{teams.map((team) => (
				<TeamCard team={team} key={generateKey(team.id)} />
			))}
			<div className="add-team-card" onClick={addTeamCard}>
				+
			</div>
		</div>
	);
}
