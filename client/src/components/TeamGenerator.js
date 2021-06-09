import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState, useContext } from "react";
import { shuffleArray } from "../Globals";
import { useTeams } from "../routes/TeamManagerPage";
import CollapsableFieldset from "./CollapsibleFieldset";
import useForm from "../hooks/useForm";

const ItemsContext = React.createContext();

export const useItems = () => {
	return useContext(ItemsContext);
};

export default function TeamGenerator({ itemList }) {
	const formFields = {
		teamCount: {
			value: 1,
			validations: [],
		},
	};
	const [formInputs, changeFormInputs] = useForm(formFields);

	const [items, setItems] = useState(() =>
		itemList.map((item) => {
			return { ...item, isParticipating: true, assignedTeam: null };
		})
	);
	const [, setTeams] = useTeams();

	const teamModel = (id = 1, members = []) => {
		return {
			id: id,
			title: `Team ${id}`,
			members: members,
		};
	};

	// team generator function
	const generateTeams = (teamCount, items) => {
		const memberCount = Math.ceil(items.length / teamCount);
		if (teamCount === 0) return;

		items = shuffleArray(items);

		const teams = [];
		for (let i = 0, n = 0; i < teamCount; i++, n += memberCount) {
			const members = items.slice(n, n + memberCount);
			console.log(i, n, members);
			const newTeam = teamModel(i + 1, members);
			teams.push(newTeam);
		}

		return teams;
	};

	const handleTeamGeneration = (event) => {
		event.preventDefault();
		const teams = generateTeams(
			formInputs.teamCount,
			items.filter((item) => item.isParticipating)
		);
		setTeams(teams);
	};

	return (
		<div className="team-generator-container">
			<form className="toggle-input" onSubmit={handleTeamGeneration}>
				<label>
					<input
						type="number"
						name="teamCount"
						value={formInputs.teamCount}
						onChange={changeFormInputs}
						min="1"
						max={items.filter((item) => item.isParticipating).length}
						required
					/>
				</label>
				<button type="submit">generate</button>
			</form>
			<ItemsContext.Provider value={[items, setItems]}>
				<CollapsableFieldset itemList={items} />
			</ItemsContext.Provider>
		</div>
	);
}
