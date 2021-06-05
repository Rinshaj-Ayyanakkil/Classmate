import "../css/Base.css";
import "../css/UI-Components.css";
import Biodata from "./Biodata";
import { fetchStudentImage } from "../Globals";

export default function MaximizedProfileCard({ student, onClose }) {
	return (
		<div className={`max-profile-card-container`} onClick={onClose}>
			<div className={`max-profile-card`} onClick={(e) => e.stopPropagation()}>
				<button className={`close-button`} onClick={onClose}></button>
				<div className={`image`}>
					<img src={fetchStudentImage(student.rollNo)} alt={`Unavailable`} />
				</div>
				<div className={`bio`}>
					<Biodata label={`name`} value={student.name} />
					<Biodata label={`dob`} value={student.dob} />
					<Biodata label={`sex`} value={student.sex} />
					<Biodata label={`phone`} value={student.phone} />
					<Biodata label={`address`} value={student.address} />
					<Biodata label={`register no.`} value={student.regNo} />
					<Biodata label={`father`} value={student.father} />
					<Biodata label={`mother`} value={student.mother} />
					<Biodata label={`blood group`} value={student.bloodGroup} />
				</div>
			</div>
		</div>
	);
}
