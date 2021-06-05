import React, { useState, useContext, useEffect } from "react";
import GroupViewer from "../components/GroupViewer";
import TeamGenerator from "../components/TeamGenerator";
import TeamSaveMenu from "../components/TeamSaveMenu";
import TeamViewer from "../components/TeamViewer";
import TeamCreator from "../components/TeamCreator";
import { useStudents } from "../contexts/StudentsContext";
import SliderSwitch from "../components/SliderSwitch";

const TeamsContext = React.createContext();

export const useTeams = () => {
	return useContext(TeamsContext);
};

export default function TeamManagerPage() {
	const [isAutoGeneration, setAutoGeneration] = useState(false);
	const [teams, setTeams] = useState([]);

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

	const toggleAutoGeneration = () => {
		setAutoGeneration(!isAutoGeneration);
	};

	return (
		<div className="page-container">
			<h1>Team Manager</h1>

			<SliderSwitch
				isChecked={isAutoGeneration}
				onChange={toggleAutoGeneration}
				dataOn="Auto"
				dataOff="Manual"
			/>

			<TeamsContext.Provider value={[teams, setTeams]}>
				{items.length !== 0 && (
					<div>
						{isAutoGeneration ? (
							<TeamGenerator itemList={items} />
						) : (
							<TeamCreator itemList={items} />
						)}
					</div>
				)}
				<TeamViewer teams={teams} />
				<TeamSaveMenu />
				<GroupViewer />
			</TeamsContext.Provider>
		</div>
	);
}
