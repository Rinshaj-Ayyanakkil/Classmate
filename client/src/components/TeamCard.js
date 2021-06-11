import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useRef, useState } from "react";
import { generateKey } from "../Globals";
import { useDragDrop } from "./TeamGenerator";

export default function TeamCard({ team }) {
	const [handleDragStart, handleDragEnd, handleDragEnter] = useDragDrop();
	const [isEditable, setEditable] = useState(false);
	const titleRef = useRef(null);

	const toggleEditable = () => {
		setEditable((isEditable) => !isEditable);
	};

	useEffect(() => {
		titleRef.current.focus();
	}, [isEditable]);

	return (
		<div className="team-card" onDragEnter={(e) => handleDragEnter(e, team.id)}>
			<div className="title">
				<h3
					contentEditable={isEditable}
					className={`${isEditable && `editable`}`}
					ref={titleRef}
				>
					{team.title}
				</h3>

				<p onClick={toggleEditable}>edit</p>
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
