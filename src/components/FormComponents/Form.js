import React from "react";

export default function Form({ onSubmit, children }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit();
	};

	return <form onSubmit={handleSubmit}>{children}</form>;
}
