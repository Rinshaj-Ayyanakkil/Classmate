import React from "react";
import { generateKey } from "../Globals";
import useFetch from "../hooks/useFetch";
import TeamViewer from "./TeamViewer";

export default function GroupViewer({ teams }) {
	const [res] = useFetch(`${process.env.REACT_APP_SERVER_URL}/teams`);

	return (
		<div className="group-view-container">
			{res?.groups &&
				res.groups.map((group) => (
					<div className="group-view" key={generateKey()}>
						<h1>{group.title}</h1>
						<TeamViewer teams={group.teams} />
					</div>
				))}
		</div>
	);
}
