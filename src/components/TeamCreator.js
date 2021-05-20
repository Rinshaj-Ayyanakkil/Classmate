import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import { useItems } from "../routes/TeamManagerPage";
export default function TeamCreator() {
	const [teamCards, setTeamCards] = useState([]);
	const [items] = useItems();

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

	const handleDragStart = (id) => {
		console.log(`dragging ${id}`);
		const draggedItem = items.find((item) => item.id === id);
		draggedItem.isDragging = true;
	};

	const handleDragEnd = (e, id) => {
		e.stopPropagation();
		console.log(`drag ended for ${id}`);
		const draggedItem = items.find((item) => item.id === id);
		draggedItem.isDragging = false;
		console.log(draggedItem.isDragging);
	};

	const handleDragOver = (card) => {
		const targetCard = teamCards.find((teamCard) => teamCard.title === card);
		const draggedItem = items.find((item) => item.isDragging);

		const members = new Set(targetCard.members);
		members.add(draggedItem);

		setTeamCards((cards) =>
			cards.map((card) =>
				card === targetCard ? { ...card, members: [...members] } : card
			)
		);
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
							onDragStart={() => handleDragStart(item.id)}
							onDragEnd={(e) => handleDragEnd(e, item.id)}
						>
							{item.content}
						</div>
					))}
			</div>

			<div className="team-cards-container">
				{teamCards.map((teamCard) => (
					<div
						key={generateKey(teamCard.title)}
						className="team-card"
						onDragOver={() => handleDragOver(teamCard.title)}
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
