import { useState, useEffect, useCallback } from "react";

const useFetch = ({ url, options }, fetchOnMount = false) => {
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

	// fetch data on mount
	useEffect(() => {
		console.log(`fetch render`);
		if (fetchOnMount) fetchData();
	}, [fetchData, fetchOnMount]);

	return [response, isLoading, fetchData];
};

export default useFetch;
