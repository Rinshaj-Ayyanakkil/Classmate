import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useRef, useState } from "react";
import { generateKey } from "../Globals";
import { useDragDrop } from "./TeamGenerator";
import { useTeams } from "../routes/TeamManagerPage";
import { ACTIONS } from "../routes/TeamManagerPage";

export default function TeamCard({ team }) {
	const [handleDragStart, handleDragEnd, handleDragEnter] = useDragDrop();

	const [isEditable, setEditable] = useState(false);

	const titleRef = useRef(null);
	useEffect(() => {
		titleRef.current.focus();
	}, [isEditable]);
	const [, dispatch] = useTeams();

	const saveNewTitle = (id, newTitle) => {
		console.log(`new title: ${newTitle}`);
		dispatch({
			type: ACTIONS.CHANGE_TEAM_TITLE,
			payload: { id: team.id, title: newTitle },
		});
		setEditable(false);
	};

	return (
		<div className="team-card" onDragEnter={(e) => handleDragEnter(e, team.id)}>
			<div className="title">
				<h3
					contentEditable={isEditable}
					className={`${isEditable && `editable`}`}
					ref={titleRef}
					suppressContentEditableWarning={true}
				>
					{team.title}
				</h3>

				{!isEditable ? (
					<button onClick={() => setEditable(true)}>edit</button>
				) : (
					<button onClick={() => saveNewTitle(team.id, titleRef.current?.innerText)}>
						save
					</button>
				)}
			</div>
			{team.members.map((member) => (
				<div
					key={generateKey(member)}
					className="member"
					draggable
					onDragStart={(e) => handleDragStart(e, member.id)}
					onDragEnd={(e) => handleDragEnd(e)}
				>
					{member.content}
				</div>
			))}
		</div>
	);
}
