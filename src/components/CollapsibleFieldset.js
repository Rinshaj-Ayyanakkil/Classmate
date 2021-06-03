import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";
import { useItems } from "./TeamGenerator";

export default function CollapsableFieldset({ itemList }) {
	const [items, setItems] = useItems();

	const [isFieldsetCollapsed, setFieldsetCollapsed] = useState(false);
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
		<fieldset
			className={`collapsible-fieldset ${isFieldsetCollapsed && `collapsed`}`}
		>
			<legend onClick={() => setFieldsetCollapsed(!isFieldsetCollapsed)}>
				{isFieldsetCollapsed ? `SHOW` : `HIDE`}
			</legend>

			<label className="switch">
				<input
					type="checkbox"
					checked={isAllParticipating}
					onChange={toggleAllChecked}
				/>
				<span className="slider"></span>
			</label>

			<div className="items-list">
				{items.map((item) => (
					<div
						className={`item-content ${!item.isParticipating && `checked`}`}
						onClick={() => toggleItemCheck(item.id)}
						key={generateKey(item.id)}
					>
						{item.content}
					</div>
				))}
			</div>
		</fieldset>
	);
}
