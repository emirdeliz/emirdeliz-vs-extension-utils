export const getPromiseTest = function () {
	const promiseOne = new Promise(function (resolve) {
		setTimeout(resolve, 500);
	});

	const promiseTwo = new Promise(function (resolve) {
		setTimeout(resolve, 300);
	});

	const promiseThree = new Promise(function (_resolve, reject) {
		try {
			setTimeout(reject, 100);
		} catch (e) {
			console.debug('Reject test');
		}
	});

	const promiseFour = new Promise(function (resolve) {
		setTimeout(resolve, 450);
	});

	const promiseFive = new Promise(function (_resolve, reject) {
		try {
			setTimeout(reject, 350);
		} catch (e) {
			console.debug('Reject test');
		}
	});
	return [promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive];
};

export const getPromiseSuccessfullyTest = function () {
	const promiseOne = new Promise(function (resolve) {
		setTimeout(resolve, 500);
	});

	const promiseTwo = new Promise(function (resolve) {
		setTimeout(resolve, 300);
	});

	const promiseThree = new Promise(function (resolve) {
		setTimeout(resolve, 100);
	});
	return [promiseOne, promiseTwo, promiseThree];
};
