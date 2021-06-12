import React, { useState, useContext, useEffect, useReducer } from "react";
import SavedGroups from "../components/SavedGroups";
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
	CHANGE_TEAM_TITLE: "changeTeamTitle",
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
			case ACTIONS.CHANGE_TEAM_TITLE:
				return {
					...state,
					teams: state.teams.map((team) => {
						return team.id === action.payload.id
							? { ...team, title: action.payload.title }
							: team;
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
				<SavedGroups />
			</TeamsContext.Provider>
		</div>
	);
}
