import React from "react";
import { generateKey } from "../Globals";

export default function TeamViewer(props) {
	return (
		<div className="team-view-container">
			{Object.keys(props.teams).map((team) => (
				<div key={generateKey(team)} className="team-view">
					<h3>{`${team} ( ${props.teams[team].length} )`}</h3>
					<ul>
						{props.teams[team].map((member) => (
							<li
								key={generateKey(member.rollno)}
							>{`${member.rollno}. ${member.name}`}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
