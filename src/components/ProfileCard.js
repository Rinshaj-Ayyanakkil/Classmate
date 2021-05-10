import "../css/Base.css";
import "../css/UI-Components.css";
import { fetchStudentImage } from "../Globals";

export default function ProfileCard(props) {
	return (
		<div className={`profile-card`} onClick={props.onClick}>
			<div className={"image"}>
				<img src={fetchStudentImage(props.student.rollno)} alt={`unavilable`} />
			</div>

			<div className={`header rollno`}>{props.student.rollno}</div>
			<div className={`header name`}>{props.student.name}</div>
		</div>
	);
}
