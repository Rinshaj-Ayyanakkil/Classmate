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

const ItemContext = React.createContext();

export const useItems = () => {
	return useContext(ItemContext);
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
					isParticipating: true,
				};
			})
		);
	}, [studentsData]);

	return (
		<div className="page-container">
			<h1>Team Manager</h1>
			<TeamsContext.Provider value={[teams, setTeams]}>
				<ItemContext.Provider value={[items, setItems]}>
					{items.length !== 0 && <TeamCreator itemList={items} />}
					<TeamGenerator />
					<TeamViewer teams={teams} />
					<TeamSaveMenu />
					<GroupViewer />
				</ItemContext.Provider>
			</TeamsContext.Provider>
		</div>
	);
}
