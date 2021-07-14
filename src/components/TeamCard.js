import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useRef, useState } from "react";
import { generateKey } from "../Globals";
import { useDragDrop } from "./TeamGenerator";

export default function TeamCard({ team, onChangeTitle }) {
	const [handleDragStart, handleDragEnd, handleDragEnter] = useDragDrop();

	const [isEditable, setEditable] = useState(false);

	const titleRef = useRef(null);
	useEffect(() => {
		titleRef.current.focus();
	}, [isEditable]);

	const handleChangeTitle = (id, newTitle) => {
		const isTitleChanged = onChangeTitle(team.id, newTitle);
		// if title is changed successfully, editable is set false and vice versa
		setEditable(!isTitleChanged);
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
					<button
						onClick={() => handleChangeTitle(team.id, titleRef.current?.innerText)}
					>
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
