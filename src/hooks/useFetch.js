import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		try {
			const res = await fetch(url, options);
			const data = await res.json();
			setResponse(data);
			setLoading(false);
		} catch (error) {
			setResponse(null);
		}
	}, [url, options]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return [response, isLoading];
};

export default useFetch;
