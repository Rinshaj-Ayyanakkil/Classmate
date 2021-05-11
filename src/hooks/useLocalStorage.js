import { useState, useEffect } from "react";

const getInitialValue = (key, initialState) => {
	const savedState = JSON.parse(localStorage.getItem(key));

	if (savedState) return savedState;

	return initialState instanceof Function ? initialState() : initialState;
};

const useLocalStorage = (key, initialState) => {
	const [state, setState] = useState(() => {
		return getInitialValue(key, initialState);
	});

	useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
		state,
		key,
	]);

	return [state, setState];
};

export default useLocalStorage;
