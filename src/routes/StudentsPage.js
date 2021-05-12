import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import MaximizedProfileCard from "../components/MaximizedProfileCard";
import useFetch from "../hooks/useFetch";
import { generateKey } from "../Globals";

export default function StudentsPage() {
	const [response] = useFetch(`${process.env.REACT_APP_SERVER_URL}/students`);

	const [students, setStudents] = useState([]);
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(() => {
		if (response) setStudents(response);
	}, [response]);

	return (
		<div className="page-container">
			<div className={`profile-cards-container`}>
				{students.map((student) => (
					<ProfileCard
						key={generateKey(student.rollNo)}
						student={student}
						onClick={() => setSelectedCard(student)}
					/>
				))}
			</div>

			{selectedCard ? (
				<MaximizedProfileCard
					student={selectedCard}
					onClose={() => setSelectedCard(null)}
				/>
			) : null}
		</div>
	);
}
