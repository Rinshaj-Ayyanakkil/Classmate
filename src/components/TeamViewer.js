import React from "react";
import { generateKey } from "../Globals";
import { useTeams } from "../routes/TeamManagerPage";

export default function TeamViewer(props) {
	const [teams] = useTeams();

	return (
		<div className="team-view-container">
			{Object.keys(teams).map((team) => (
				<div key={generateKey(team)} className="team-view">
					<h3>{`${team} ( ${teams[team].length} )`}</h3>
					<ul>
						{teams[team].map((member) => (
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
