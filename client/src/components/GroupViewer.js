import React, { useState, useEffect, useRef } from "react";
import TeamViewer from "./TeamViewer";

export default function GroupViewer({ group, onChangeTitle }) {
	const [isEditable, setEditable] = useState(false);

	const titleRef = useRef(null);

	useEffect(() => {
		titleRef.current.focus();
	}, [isEditable]);

	const handleChangeTitle = (id, newTitle) => {
		const isTitleChanged = onChangeTitle(group.id, newTitle);
		// if title is changed successfully, editable is set false and vice versa
		setEditable(!isTitleChanged);
	};

	return (
		<div className="group-view">
			<div className="header">
				<h1 ref={titleRef} contentEditable={isEditable}>
					{group.title}
				</h1>
				{!isEditable ? (
					<button onClick={() => setEditable(true)}>edit</button>
				) : (
					<button
						onClick={() => handleChangeTitle(group.id, titleRef.current.innerText)}
					>
						save
					</button>
				)}
			</div>
			<div className="content">
				<TeamViewer teams={group.teams} />
			</div>
		</div>
	);
}
