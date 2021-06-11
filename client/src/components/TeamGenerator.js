import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { generateKey, shuffleArray } from "../Globals";
import { useTeams, ACTIONS } from "../routes/TeamManagerPage";
import CandidateItems from "./CandidateItems";
import useForm from "../hooks/useForm";

const ItemsContext = React.createContext();

export const useItems = () => {
	return useContext(ItemsContext);
};

export default function TeamGenerator({ itemList }) {
	const [items, setItems] = useState(itemList);

	const formFields = {
		teamCount: {
			value: 1,
			validations: [],
		},
	};
	const [formInputs, changeFormInputs] = useForm(formFields);

	const [teams, dispatch] = useTeams();

	// function to add empty teams
	const createTeams = (count = 1) => {
		const currentTeamCount = teams.length;
		console.log(currentTeamCount);
		const teamModel = (id = 1, members = []) => {
			return {
				id: generateKey(id),
				title: `Team ${id}`,
				members: members,
			};
		};

		const newTeams = [];
		for (let i = 1; i <= count; i++) {
			newTeams.push(teamModel(currentTeamCount + i));
		}

		dispatch({ type: ACTIONS.UPDATE_TEAMS, payload: { newTeams: newTeams } });

		return newTeams;
	};

	// function assigning a team to each item
	const assignTeams = (teamCount, items) => {
		if (teamCount === 0) return [];

		const newTeams = createTeams(teamCount);

		// evenly assigning each item a team id

		let candidates = [
			...items.filter((item) => item.isParticipating && !item.assignedTeam),
		];
		candidates = shuffleArray(candidates);

		candidates.map((item, i) => {
			// value of n will starts from 0 to teamCount and resets to 0 upon reaching teamCount again
			// eg: if teamCount = 5, n = 0, 1, 2, 3, 4, 0, 1 ....
			let n = i < teamCount ? i : i - teamCount * Math.floor(i / teamCount);
			const randomItem = { ...item, assignedTeam: newTeams[n]?.id };

			items = items.map((item) =>
				item.id === randomItem.id
					? { ...item, assignedTeam: randomItem.assignedTeam }
					: item
			);
			return candidates;
		});
		return items;
	};

	// updating teams whenever the items change
	const stableDispatch = useCallback(dispatch, [dispatch]);
	useEffect(() => {
		stableDispatch({
			type: ACTIONS.SET_MEMBERS_BY_ITEMS,
			payload: { items: items },
		});
	}, [items, stableDispatch]);

	// team generation function to be called on submitting the team count
	const generateTeams = (event) => {
		event.preventDefault();

		console.log(`after clear: ${teams.length}`);

		const assignedItems = assignTeams(formInputs.teamCount, items);
		setItems(assignedItems);
	};

	// drag and drop handlers for manually re-arranging team members
	let dropZone = undefined;
	let draggedItem = undefined;

	const handleDragStart = (event, id) => {
		event.stopPropagation();

		draggedItem = items.find((item) => item.id === id);
	};

	const handleDragEnter = (event, id) => {
		event.preventDefault();
		event.stopPropagation();

		// dropZone will be either a team id or undefined
		dropZone = teams.find((team) => team.id === id);
	};

	const handleDragEnd = (event) => {
		event.preventDefault();
		event.stopPropagation();

		// Updates the assigned team of the dragged with dropZone
		setItems(
			items.map((item) =>
				item === draggedItem ? { ...item, assignedTeam: dropZone?.id } : item
			)
		);
	};

	return (
		<div className="team-generator-container" onDragEnter={handleDragEnter}>
			<form className="user-input-form" onSubmit={generateTeams}>
				<div className="field">
					<label>Team Count </label>
					<input
						type="number"
						name="teamCount"
						value={formInputs.teamCount}
						onChange={changeFormInputs}
						min="1"
						max={items.filter((item) => item.isParticipating).length}
						required
					/>
				</div>
				<button type="submit">generate</button>
			</form>

			<ItemsContext.Provider value={[items, setItems]}>
				<CandidateItems
					itemList={items}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				/>
			</ItemsContext.Provider>

			<div className="team-cards-container">
				{teams.map((team) => (
					<div
						key={generateKey(team.id)}
						className="team-card"
						onDragEnter={(e) => handleDragEnter(e, team.id)}
					>
						<div className="title">
							<h3>{team.title}</h3>
							<p>{team.members.length}</p>
						</div>
						{team.members.map((member) => (
							<div
								key={generateKey(member)}
								className="member"
								draggable
								onDragStart={(e) => handleDragStart(e, member.id)}
								onDragEnd={(e) => handleDragEnd(e, member.id)}
							>
								{member.content}
							</div>
						))}
					</div>
				))}

				<div className="add-team-card" onClick={() => createTeams()}>
					+
				</div>
			</div>
		</div>
	);
}
