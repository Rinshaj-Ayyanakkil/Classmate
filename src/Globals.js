export const fetchStudentImage = (rollno) => {
	return `../assets/images/${rollno}.jpg`;
};

export const generateKey = (salt) => {
	return `${salt}_${new Date().getTime()}`;
};

export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = getRandomNumber(0, i); // random index from 0 to i
		[array[i], array[j]] = [array[j], array[i]];
	}
};
