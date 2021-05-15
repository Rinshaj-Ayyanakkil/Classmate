import React, { useState, useContext } from "react";
import TeamGenerator from "../components/TeamGenerator";
import TeamViewer from "../components/TeamViewer";

const TeamsContext = React.createContext();

export const useTeams = () => {
	return useContext(TeamsContext);
};

export default function TeamManagerPage() {
	const [teams, setTeams] = useState({});

	return (
		<div className="page-container">
			<h1>Team Generator</h1>
			<TeamsContext.Provider value={[teams, setTeams]}>
				<TeamGenerator />
				<TeamViewer teams={teams} />
			</TeamsContext.Provider>
		</div>
	);
}
