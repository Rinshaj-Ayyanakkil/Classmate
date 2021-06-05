import { useRef } from "react";

const useFirstRender = () => {
	const ref = useRef(true);
	const isFirstRender = ref.current;
	ref.current = false;
	return isFirstRender;
};

export default useFirstRender;
