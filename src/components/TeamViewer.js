import React from "react";
import { generateKey } from "../Globals";

export default function TeamViewer({ teams }) {
	return (
		<div className="team-view-container">
			{teams.map((team) => (
				<div key={generateKey(team)} className="team-view">
					<h3>{`${team.title} (${team.members.length})`}</h3>
					<ul>
						{team.members.map((member) => (
							<li key={generateKey(member.id)}>{`${member.id}. ${member.content}`}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
