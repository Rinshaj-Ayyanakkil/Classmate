import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options) => {
	const [response, setResponse] = useState();
	const [isLoading, setLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(url, options);
			const data = await res.json();
			setResponse(data);
			setLoading(false);
		} catch (error) {
			setResponse(null);
		} finally {
			setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return [response, isLoading, fetchData];
};

export default useFetch;
