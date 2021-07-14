export const fetchStudentImage = (rollno) => {
	return `../assets/images/${rollno}.jpg`;
};

export const generateKey = (salt) => {
	return (
		salt +
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		)
	);
};

export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (array) => {
	const arrayCopy = [...array];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		let j = getRandomNumber(0, i); // random index from 0 to i
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}
	return arrayCopy;
};
