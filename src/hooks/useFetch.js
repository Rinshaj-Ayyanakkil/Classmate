import { useState, useEffect } from "react";

const useFetch = (url, options) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url, options);
				const data = await res.json();
				setResponse({ ok: true, data: data });
				setLoading(false);
			} catch (error) {
				setResponse({ ok: false, error: error });
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);
	return [response, isLoading];
};

export default useFetch;
