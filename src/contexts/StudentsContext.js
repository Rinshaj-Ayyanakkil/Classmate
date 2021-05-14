import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const StudentsContext = React.createContext();

export const useStudents = () => {
	return useContext(StudentsContext);
};

export function StudentsProvider({ children }) {
	const [response] = useFetch(`${process.env.REACT_APP_SERVER_URL}/students`);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		if (response?.students) setStudents(response.students);
	}, [response]);

	return (
		<StudentsContext.Provider value={students}>
			{children}
		</StudentsContext.Provider>
	);
}
