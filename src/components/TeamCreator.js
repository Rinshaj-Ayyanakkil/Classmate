import React, { useState } from "react";
import { generateKey } from "../Globals";
export default function TeamCreator({ itemList }) {
	const [teamCards, setTeamCards] = useState([]);
	const [items, setItems] = useState(itemList);

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

	const handleDragStart = (e, id) => {
		// e.preventDefault();
		e.stopPropagation();
		console.log(`dragging ${id}`);
		const draggedItem = items.find((item) => item.id === id);
		draggedItem.isDragging = true;
	};

	const handleDragEnd = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(`drag ended for ${id}`);
		const draggedItem = items.find((item) => item.id === id);
		if (teamCards.includes(dropZone) && !dropZone.members.includes(draggedItem)) {
			const members = dropZone.members;
			members.push(draggedItem);
			setTeamCards((cards) =>
				cards.map((card) =>
					card === dropZone ? { ...card, members: [...members] } : card
				)
			);
			console.log(`${draggedItem.id} added to ${dropZone.title}`);
			setItems(items.filter((item) => item !== draggedItem));
			console.log(`new items: ${items.length}`);
		}
	};

	const handleDragEnter = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		const targetCard = teamCards.find((teamCard) => teamCard.id === id);
		console.log(`entering: team ${id}`);
		dropZone = targetCard;
	};

	return (
		<div className="team-creator-container">
			<div className="items-list">
				{items &&
					items.map((item) => (
						<div
							key={generateKey(item.id)}
							className="item-content"
							draggable="true"
							onDragStart={(e) => handleDragStart(e, item.id)}
							onDragEnd={(e) => handleDragEnd(e, item.id)}
						>
							{item.content}
						</div>
					))}
			</div>

			<div className="team-cards-container">
				{teamCards.map((teamCard) => (
					<div
						key={generateKey(teamCard.id)}
						className="team-card"
						onDragEnter={(e) => handleDragEnter(e, teamCard.id)}
					>
						<div className="title">{teamCard.title}</div>
						{teamCard.members.map((member) => (
							<div key={generateKey(member)} className="members">
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
