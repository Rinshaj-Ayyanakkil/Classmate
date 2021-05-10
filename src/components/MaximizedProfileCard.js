import "../css/Base.css";
import "../css/UI-Components.css";
import Biodata from "./Biodata";
import { fetchStudentImage } from "../Globals";

export default function MaximizedProfileCard(props) {
	return (
		<div className={`max-profile-card-container`} onClick={props.onClose}>
			<div className={`max-profile-card`} onClick={(e) => e.stopPropagation()}>
				<button className={`close-button`} onClick={props.onClose}></button>
				<div className={`image`}>
					<img src={fetchStudentImage(props.student.rollno)} alt={`Unavailable`} />
				</div>
				<div className={`bio`}>
					<Biodata label={`name`} value={props.student.name} />
					<Biodata label={`dob`} value={props.student.dob} />
					<Biodata label={`sex`} value={props.student.sex} />
					<Biodata label={`phone`} value={props.student.phone} />
					<Biodata label={`address`} value={props.student.address} />
					<Biodata label={`register no.`} value={props.student.regno} />
					<Biodata label={`father`} value={props.student.father} />
					<Biodata label={`mother`} value={props.student.mother} />
					<Biodata label={`blood group`} value={props.student.bloodGroup} />
				</div>
			</div>
		</div>
	);
}
