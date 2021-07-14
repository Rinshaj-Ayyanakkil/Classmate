import React, { useContext, useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";

const StudentsContext = React.createContext();

export const useStudents = () => {
	return useContext(StudentsContext);
};

export function StudentsProvider({ children }) {
	const request = useMemo(
		() => ({
			url: `${process.env.REACT_APP_SERVER_URL}/students`,
			options: null,
		}),
		[]
	);
	const [response] = useFetch(request, true);
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
