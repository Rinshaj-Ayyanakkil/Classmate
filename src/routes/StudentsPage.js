import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState } from "react";
import studentsData from "../assets/students.json";
import ProfileCard from "../components/ProfileCard";
import MaximizedProfileCard from "../components/MaximizedProfileCard";

export default function StudentsList() {
	const [students] = useState(studentsData);
	const [selectedCard, setSelectedCard] = useState(null);
	return (
		<div className="page-container">
			<div className={`profile-cards-container`}>
				{students.map((student) => (
					<ProfileCard
						student={student}
						key={student.rollno}
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
