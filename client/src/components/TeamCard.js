import "../css/Base.css";
import "../css/UI-Components.css";
import { generateKey } from "../Globals";

export default function TeamCards({
	team,
	onDragStart,
	onDragEnter,
	onDragEnd,
}) {
	return (
		<div className="team-card" onDragEnter={(e) => onDragEnter(e, team.id)}>
			<div className="title">
				<h3>{team.title}</h3>
			</div>
			{team.members.map((member) => (
				<div
					key={generateKey(member)}
					className="member"
					draggable
					onDragStart={(e) => onDragStart(e, member.id)}
					onDragEnd={onDragEnd}
				>
					{member.content}
				</div>
			))}
		</div>
	);
}
