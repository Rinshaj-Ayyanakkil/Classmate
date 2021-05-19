import React, { useState } from "react";
import { generateKey } from "../Globals";
export default function TeamCreator() {
	const [teamCards, setTeamCards] = useState([]);

	const addTeamCard = () => {
		if (!teamCards[teamCards.length - 1]?.members && teamCards.length !== 0)
			return;
		const newTeamCard = { title: `Team ${teamCards.length + 1}` };
		setTeamCards((curr) => [...curr, newTeamCard]);
	};

	return (
		<div className="team-creator-container">
			{teamCards.map((teamCard) => (
				<div key={generateKey()} className="team-card">
					{teamCard.title}
				</div>
			))}
			<div className="add-team-card" onClick={addTeamCard}>
				+
			</div>
		</div>
	);
}
