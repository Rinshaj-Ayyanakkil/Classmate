import React, { useState, useContext, useEffect } from "react";
import GroupViewer from "../components/GroupViewer";
import TeamGenerator from "../components/TeamGenerator";
import TeamSaveMenu from "../components/TeamSaveMenu";
import TeamViewer from "../components/TeamViewer";
import TeamCreator from "../components/TeamCreator";
import { useStudents } from "../contexts/StudentsContext";

const TeamsContext = React.createContext();

export const useTeams = () => {
	return useContext(TeamsContext);
};

export default function TeamManagerPage() {
	const [teams, setTeams] = useState({});

	const studentsData = useStudents();
	const [items, setItems] = useState([]);
	useEffect(() => {
		setItems(
			studentsData.map((student) => {
				return {
					id: student.rollNo,
					content: student.name,
				};
			})
		);
	}, [studentsData]);

	return (
		<div className="page-container">
			<h1>Team Manager</h1>
			<TeamsContext.Provider value={[teams, setTeams]}>
				{items.length !== 0 && <TeamCreator itemList={items} />}
				{items.length !== 0 && <TeamGenerator itemList={items} />}
				<TeamViewer teams={teams} />
				<TeamSaveMenu />
				<GroupViewer />
			</TeamsContext.Provider>
		</div>
	);
}
