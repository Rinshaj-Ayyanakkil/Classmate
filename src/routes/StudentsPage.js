import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import MaximizedProfileCard from "../components/MaximizedProfileCard";
import { generateKey } from "../Globals";
import { useStudents } from "../contexts/StudentsContext";

export default function StudentsPage() {
	const students = useStudents();
	const [maximizedCard, setMaximizedCard] = useState(null);

	return (
		<div className="page-container">
			<div className={`profile-cards-container`}>
				{students.map((student) => (
					<ProfileCard
						key={generateKey(student.rollNo)}
						student={student}
						onClick={() => setMaximizedCard(student)}
					/>
				))}
			</div>

			{maximizedCard ? (
				<MaximizedProfileCard
					student={maximizedCard}
					onClose={() => setMaximizedCard(null)}
				/>
			) : null}
		</div>
	);
}
