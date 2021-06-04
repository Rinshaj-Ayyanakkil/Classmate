import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import { useTeams } from "../routes/TeamManagerPage";
export default function TeamCreator({ itemList }) {
	const [teamCards, setTeamCards] = useState([]);
	const [items, setItems] = useState(() =>
		itemList.map((item) => {
			return { ...item, assignedTeam: null };
		})
	);

	const [, setTeams] = useTeams();

	useEffect(() => {
		setTeams(teamCards);
	}, [teamCards, setTeams]);

	let dropZone = undefined;

	const addTeamCard = () => {
		if (
			teamCards[teamCards.length - 1]?.members.length === 0 &&
			teamCards.length !== 0
		)
			return;
		const newTeamCard = {
			id: teamCards.length + 1,
			title: `Team ${teamCards.length + 1}`,
			members: [],
		};
		setTeamCards((curr) => [...curr, newTeamCard]);
	};

	const handleDragEnd = (e, id) => {
		e.preventDefault();
		e.stopPropagation();

		const draggedItem = items.find((item) => item.id === id);

		setItems(
			items.map((item) =>
				item === draggedItem ? { ...item, assignedTeam: dropZone?.id } : item
			)
		);
	};

	useEffect(() => {
		setTeamCards((teamCards) =>
			teamCards.map((team) => {
				return {
					...team,
					members: [...items.filter((item) => item.assignedTeam === team.id)],
				};
			})
		);
	}, [items]);

	const handleDragEnter = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		const targetCard = teamCards.find((teamCard) => teamCard.id === id);
		dropZone = targetCard;
	};

	return (
		<div className="team-creator-container">
			<div className="items-list" onDragEnter={(e) => handleDragEnter(e)}>
				{items.map(
					(item) =>
						!item.assignedTeam && (
							<div
								key={generateKey(item.id)}
								className="item-content"
								draggable="true"
								onDragEnd={(e) => handleDragEnd(e, item.id)}
							>
								{item.content}
							</div>
						)
				)}
			</div>

			<div className="team-cards-container">
				{teamCards.map((teamCard) => (
					<div
						key={generateKey(teamCard.id)}
						className="team-card"
						onDragEnter={(e) => handleDragEnter(e, teamCard.id)}
					>
						<div className="title">
							<h3>{teamCard.title}</h3>
							<p>{teamCard.members.length}</p>
						</div>
						{teamCard.members.map((member) => (
							<div
								key={generateKey(member)}
								className="member"
								draggable="true"
								onDragEnd={(e) => handleDragEnd(e, member.id)}
							>
								{member.content}
							</div>
						))}
					</div>
				))}
				<div className="add-team-card" onClick={addTeamCard}>
					+
				</div>
			</div>
		</div>
	);
}
