import "../css/Base.css";
import "../css/UI-Components.css";
import { fetchStudentImage } from "../Globals";

export default function ProfileCard({ student, onClick }) {
	return (
		<div className={`profile-card`} onClick={onClick}>
			<div className={"image"}>
				<img src={fetchStudentImage(student.rollNo)} alt={`unavailable`} />
			</div>

			<div className={`header rollno`}>{student.rollNo}</div>
			<div className={`header name`}>{student.name}</div>
		</div>
	);
}
