import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { getRandomNumber, shuffleArray } from "../Globals";
import { useTeams } from "../routes/TeamManagerPage";
import CollapsableFieldset from "./CollapsibleFieldset";
import SliderSwitch from "./SliderSwitch";

const ItemsContext = React.createContext();

export const useItems = () => {
	return useContext(ItemsContext);
};

export default function TeamGenerator({ itemList }) {
	const [userInput, setUserInput] = useState({ isTeamCount: true, value: 1 });
	const handleInputChange = (event) => {
		const [min, max, value] = [
			Number(event.target.min),
			Number(event.target.max),
			event.target.value,
		];

		if (value !== "" && value < min) return;

		if (value > max) return;

		setUserInput({ ...userInput, value: value });
	};

	const [items, setItems] = useState(() =>
		itemList.map((item) => {
			return { ...item, isParticipating: true };
		})
	);

	// team generator function
	const generateTeams = useCallback((isTeamCount, value, items) => {
		const teamCount = isTeamCount ? value : Math.ceil(items.length / value);
		const memberCount = isTeamCount ? Math.floor(items.length / value) : value;

		if (teamCount === Infinity || memberCount === Infinity) return {};

		let teams = [];

		for (let i = 0; i < teamCount; i++) {
			const members = [];
			for (let j = 0; j < memberCount; j++) {
				if (items.length === 0) break;
				shuffleArray(items);
				const randomIndex = getRandomNumber(0, items.length - 1);
				const randomItem = items[randomIndex];
				members.push(randomItem);
				items = items.filter((item) => item !== randomItem);
			}
			if (members.length === 0) break;
			const newTeam = { id: i + 1, title: `Team ${i + 1}`, members: members };
			teams.push(newTeam);
		}

		//assigning leftover items evenly to existing teams
		teams.every((team) => {
			if (items.length === 0) return false;
			team.members.push(items.pop());
			return true;
		});

		return teams;
	}, []);

	const [, setTeams] = useTeams();

	useEffect(
		() =>
			setTeams(
				generateTeams(userInput.isTeamCount, userInput.value, [
					...items.filter((item) => item.isParticipating),
				])
			),
		[userInput, items, setTeams, generateTeams]
	);

	return (
		<div className="team-generator-container">
			<div className="toggle-input">
				<SliderSwitch
					isChecked={userInput.isTeamCount}
					onChange={() =>
						setUserInput({ ...userInput, isTeamCount: !userInput.isTeamCount })
					}
					dataOn="Team Count"
					dataOff="Maximum Member Count"
				/>
				<label>
					<input
						type="number"
						name="teamCount"
						value={userInput.value}
						onChange={handleInputChange}
						min="1"
						max={items.filter((item) => item.isParticipating).length}
						required
					/>
				</label>
			</div>
			<ItemsContext.Provider value={[items, setItems]}>
				<CollapsableFieldset itemList={items} />
			</ItemsContext.Provider>
		</div>
	);
}
