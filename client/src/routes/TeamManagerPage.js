import React, { useState, useContext, useEffect, useReducer } from "react";
import GroupViewer from "../components/GroupViewer";
import TeamGenerator from "../components/TeamGenerator";
import TeamSaveMenu from "../components/TeamSaveMenu";
import { useStudents } from "../contexts/StudentsContext";

const TeamsContext = React.createContext();

export const useTeams = () => {
	return useContext(TeamsContext);
};

export const ACTIONS = {
	UPDATE_TEAMS: "updateTeams",
	SET_TEAMS: "resetTeams",
	SET_MEMBERS_BY_ITEMS: "setMembersByItem",
};

export default function TeamManagerPage() {
	const reducer = (state, action) => {
		switch (action.type) {
			case ACTIONS.UPDATE_TEAMS:
				return { ...state, teams: [...state.teams, ...action.payload.teams] };
			case ACTIONS.SET_TEAMS:
				return { ...state, teams: action.payload.teams };
			case ACTIONS.SET_MEMBERS_BY_ITEMS:
				return {
					...state,
					teams: state.teams.map((team) => {
						return {
							...team,
							members: action.payload.items.filter(
								(item) => item.assignedTeam === team.id
							),
						};
					}),
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, { teams: [] });

	const studentsData = useStudents();
	const [items, setItems] = useState([]);
	useEffect(() => {
		setItems(
			studentsData.map((student) => {
				return {
					id: student.rollNo,
					content: student.name,
					isParticipating: true,
					assignedTeam: undefined,
				};
			})
		);
	}, [studentsData]);

	return (
		<div className="page-container">
			<h1>Team Manager</h1>

			<TeamsContext.Provider value={[state.teams, dispatch]}>
				{items.length !== 0 && <TeamGenerator itemList={items} />}
				<TeamSaveMenu />
				<GroupViewer />
			</TeamsContext.Provider>
		</div>
	);
}
