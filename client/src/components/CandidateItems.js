import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import { useItems } from "./TeamGenerator";
import SliderSwitch from "./SliderSwitch";

export default function CandidateItems({ onDragEnd, onDragStart }) {
	const [items, setItems] = useItems();

	const [isAllParticipating, setAllParticipating] = useState(true);

	useEffect(() => {
		setAllParticipating(items.every((item) => item.isParticipating));
	}, [items]);

	const toggleAllChecked = () => {
		setAllParticipating(!isAllParticipating);
		setItems(
			items.map((item) => ({
				...item,
				isParticipating: !isAllParticipating,
			}))
		);
	};

	const toggleItemCheck = (id) => {
		setItems(
			items.map((item) => {
				return item.id === id
					? { ...item, isParticipating: !item.isParticipating }
					: { ...item };
			})
		);
	};

	return (
		<div className="candidate-list">
			<SliderSwitch isChecked={isAllParticipating} onChange={toggleAllChecked} />

			<div className="items-list">
				{items.map(
					(item) =>
						!item.assignedTeam && (
							<div
								className={`item-content ${!item.isParticipating && `checked`}`}
								onClick={() => toggleItemCheck(item.id)}
								key={generateKey(item.id)}
								draggable={true}
								onDragStart={(e) => onDragStart(e, item.id)}
								onDragEnd={onDragEnd}
							>
								{item.content}
							</div>
						)
				)}
			</div>
		</div>
	);
}
