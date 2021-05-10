import React, { useState } from "react";
import TeamGenerator from "../components/TeamGenerator";
import TeamViewer from "../components/TeamViewer";

export default function TeamGeneratorPage(props) {
	const [teams, setTeams] = useState({});

	const fetchGeneratedTeam = (fetchedTeam) => {
		setTeams(fetchedTeam);
	};

	return (
		<div className="page-container">
			<h1>Team Generator</h1>
			<TeamGenerator onTeamGenerate={fetchGeneratedTeam} />
			<TeamViewer teams={teams} />
		</div>
	);
}
