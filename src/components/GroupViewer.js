import React from "react";
import { generateKey } from "../Globals";
import useFetch from "../hooks/useFetch";
import TeamViewer from "./TeamViewer";

export default function GroupViewer({ teams }) {
	const [groups] = useFetch(`${process.env.REACT_APP_SERVER_URL}/teams`);

	return (
		<div className="group-view-container">
			{groups &&
				Object.keys(groups).map((group) => (
					<div className="group-view" key={generateKey(Math.random())}>
						<h1>{group}</h1>
						<TeamViewer teams={groups[group]} />
					</div>
				))}
		</div>
	);
}
