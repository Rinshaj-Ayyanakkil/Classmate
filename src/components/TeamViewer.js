import React from "react";
import { generateKey } from "../Globals";

export default function TeamViewer({ teams }) {
	return (
		<div className="team-view-container">
			{Object.keys(teams).map((team) => (
				<div key={generateKey(team)} className="team-view">
					<h3>{`${team} ( ${teams[team].length} )`}</h3>
					<ul>
						{teams[team].map((member) => (
							<li key={generateKey(member.id)}>{`${member.id}. ${member.content}`}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
