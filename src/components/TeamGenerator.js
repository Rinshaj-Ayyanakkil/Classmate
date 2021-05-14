import "../css/Base.css";
import "../css/UI-Components.css";
import React, { useEffect, useState, useCallback } from "react";
import { generateKey, getRandomNumber, shuffleArray } from "../Globals";
import { useStudents } from "../contexts/StudentsContext";
import { useTeams } from "../routes/TeamGeneratorPage";

export default function TeamGenerator({ onTeamGenerate }) {
	const [students, setStudents] = useState([]);
	const studentsData = useStudents();

	useEffect(() => {
		setStudents(
			studentsData.map((student) => {
				return {
					rollno: student.rollNo,
					name: student.name,
					isParticipating: true,
				};
			})
		);
	}, [studentsData]);

	const [isAllStudentsChecked, setAllStudentsChecked] = useState(true);

	const [, setTeams] = useTeams();

	const [isFieldsetCollapsed, setFieldsetCollapsed] = useState(false);
	const [userInput, setUserInput] = useState({ isTeamCount: true, value: 1 });

	const handleInputChange = (event) => {
		const [min, max, value] = [
			Number(event.target.min),
			Number(event.target.max),
			event.target.value,
		];

		if (value !== "" && value < min) return;

		if (value > max) return;

		setUserInput({ ...userInput, value: value });
	};

	const toggleItemCrossed = (rollno) => {
		const index = students.findIndex((student) => student.rollno === rollno);
		const temp = [...students];
		temp[index].isParticipating = !temp[index].isParticipating;
		setStudents([...temp]);
	};

	useEffect(() => {
		setAllStudentsChecked(
			students.filter((student) => !student.isParticipating).length === 0
		);
	}, [students]);

	const toggleAllItemsCrossed = () => {
		setAllStudentsChecked(!isAllStudentsChecked);
		setStudents(
			students.map((student) => ({
				...student,
				isParticipating: !isAllStudentsChecked,
			}))
		);
	};

	// team generator function
	const generateTeams = useCallback((isTeamCount, value, items) => {
		const teamCount = isTeamCount ? value : Math.ceil(items.length / value);
		const memberCount = isTeamCount ? Math.floor(items.length / value) : value;

		if (teamCount === Infinity || memberCount === Infinity) return {};

		let teamsList = {};

		for (let i = 0; i < teamCount; i++) {
			const currTeam = [];
			for (let j = 0; j < memberCount; j++) {
				if (items.length === 0) break;
				shuffleArray(items);
				const randomIndex = getRandomNumber(0, items.length - 1);
				const randomItem = items[randomIndex];
				currTeam.push(randomItem);
				items = items.filter((item) => item !== randomItem);
			}
			if (currTeam.length === 0) break;
			teamsList = { ...teamsList, [`team ${i + 1}`]: currTeam };
		}

		if (isTeamCount) {
			for (let [key] of Object.entries(teamsList)) {
				if (items.length === 0) break;
				teamsList[key].push(items.pop());
			}
		}

		return teamsList;
	}, []);

	useEffect(
		() =>
			setTeams(
				generateTeams(userInput.isTeamCount, userInput.value, [
					...students.filter((students) => students.isParticipating),
				])
			),
		[userInput, students, setTeams, generateTeams]
	);

	return (
		<div className="page-container">
			<div className="team-generator-container">
				<div className="toggle-input">
					<div className="switch-wrapper">
						<span>Minimum Member Count</span>
						<label className="switch">
							<input
								type="checkbox"
								checked={userInput.isTeamCount}
								onChange={() =>
									setUserInput({ ...userInput, isTeamCount: !userInput.isTeamCount })
								}
							/>
							<span className="slider"></span>
						</label>
						<span>Team Count</span>
					</div>

					<label>
						<input
							type="number"
							name="teamCount"
							value={userInput.value}
							onChange={handleInputChange}
							min="1"
							max={students.filter((students) => students.isParticipating).length}
							required
						/>
					</label>
				</div>

				<fieldset
					className={`items-list-container  ${
						isFieldsetCollapsed ? `collapsed` : ``
					}`}
				>
					<legend onClick={() => setFieldsetCollapsed(!isFieldsetCollapsed)}>
						{isFieldsetCollapsed ? `SHOW` : `HIDE`}
					</legend>

					<label className="switch">
						<input
							type="checkbox"
							checked={isAllStudentsChecked}
							onChange={toggleAllItemsCrossed}
						/>
						<span className="slider"></span>
					</label>

					<div>
						{students instanceof Array
							? students.filter((student) => student.isParticipating).length
							: `no`}
					</div>

					<div className="items-list">
						{students.map((student) => (
							<div
								className={`item-content ${
									!student.isParticipating ? `unchecked` : ``
								}`}
								key={generateKey(student.rollno)}
								onClick={() => toggleItemCrossed(student.rollno)}
							>
								{student.name}
							</div>
						))}
					</div>
				</fieldset>
			</div>
		</div>
	);
}
