import React, { useState, useContext } from "react";
import GroupViewer from "../components/GroupViewer";
import TeamGenerator from "../components/TeamGenerator";
import TeamSaveMenu from "../components/TeamSaveMenu";
import TeamViewer from "../components/TeamViewer";
import TeamCreator from "../components/TeamCreator";

const TeamsContext = React.createContext();

export const useTeams = () => {
	return useContext(TeamsContext);
};

export default function TeamManagerPage() {
	const [teams, setTeams] = useState({});

	return (
		<div className="page-container">
			<h1>Team Manager</h1>
			<TeamsContext.Provider value={[teams, setTeams]}>
				<TeamCreator />
				<TeamGenerator />
				<TeamViewer teams={teams} />
				<TeamSaveMenu />
				<GroupViewer />
			</TeamsContext.Provider>
		</div>
	);
}
