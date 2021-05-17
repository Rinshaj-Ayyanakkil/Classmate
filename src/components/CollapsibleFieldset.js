import React, { useState, useEffect } from "react";
import { generateKey } from "../Globals";

export default function CollapsableFieldset({ items }) {
	const [isFieldsetCollapsed, setFieldsetCollapsed] = useState(false);
	const [itemList, setItemList] = useState(items);
	const [isAllChecked, setAllChecked] = useState(false);

	useEffect(() => {
		setAllChecked(!itemList.every((item) => item.isChecked));
		console.log(`itemList changed`);
	}, [itemList]);

	const toggleAllChecked = () => {
		setAllChecked((boolean) => !boolean);
		setItemList(
			itemList.map((item) => {
				return { ...item, isChecked: isAllChecked };
			})
		);
	};

	const toggleItemCheck = (id) => {
		setItemList(
			itemList.map((item) => {
				return item.id === id
					? { ...item, isChecked: !item.isChecked }
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
					checked={!isAllChecked}
					onChange={toggleAllChecked}
				/>
				<span className="slider"></span>
			</label>

			<div className="items-list">
				{itemList.map((item) => (
					<div
						className={`item-content ${item.isChecked && `checked`}`}
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
