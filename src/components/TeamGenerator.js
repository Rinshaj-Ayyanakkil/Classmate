import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { getRandomNumber, shuffleArray } from "../Globals";
import { useStudents } from "../contexts/StudentsContext";
import { useTeams } from "../routes/TeamManagerPage";
import CollapsableFieldset from "./CollapsibleFieldset";
import SliderSwitch from "./SliderSwitch";

const ItemContext = React.createContext();

export const useItems = () => {
	return useContext(ItemContext);
};

export default function TeamGenerator() {
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

	// team generator function
	const generateTeams = useCallback((isTeamCount, value, items) => {
		const teamCount = isTeamCount ? value : Math.ceil(items.length / value);
		const memberCount = isTeamCount ? Math.floor(items.length / value) : value;

		if (teamCount === Infinity || memberCount === Infinity) return {};

		let teamsList = {};

		for (let i = 0; i < teamCount; i++) {
			const currTeam = [];
			for (let j = 0; j < memberCount; j++) {
				if (items.length === 0) break;
				shuffleArray(items);
				const randomIndex = getRandomNumber(0, items.length - 1);
				const randomItem = items[randomIndex];
				currTeam.push(randomItem);
				items = items.filter((item) => item !== randomItem);
			}
			if (currTeam.length === 0) break;
			teamsList = { ...teamsList, [`team ${i + 1}`]: currTeam };
		}

		if (isTeamCount) {
			for (let [key] of Object.entries(teamsList)) {
				if (items.length === 0) break;
				teamsList[key].push(items.pop());
			}
		}

		return teamsList;
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
			<ItemContext.Provider value={[items, setItems]}>
				<CollapsableFieldset />
			</ItemContext.Provider>
		</div>
	);
}
