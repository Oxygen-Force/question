// Run npm install or yarn install and then run npm start or yarn start
function check(start: number[], end: number[]) {
	/**
	 * Local variables
	 */
	const left = {
		start: [],
		end: []
	};

	//
	for (const [i, v] of start.entries()) {
		const filtered = start.filter((_v, ind) => ind > i);
		if (!filtered.some((val) => end[i] > val)) {
			left.start.push(v);
			left.end.push(end[i]);
		}
	}
	return left.start.length;
}

console.log(`Can attend ${check([1, 3, 5], [2, 6, 7])} lectures`);
// => Can attend 2 lectures
console.log(`Can attend ${check([1, 3, 5, 8, 9], [2, 6, 7, 10, 11])} lectures`);
// => Can attend 3 lectures
console.log(`Can attend ${check([1, 3, 5], [2, 4, 6])} lectures`);
// => Can attend 3 lectures
console.log(`Can attend ${check([1, 3, 5, 7], [2, 4, 8, 9])} lectures`);
// => Can attend 3 lectures
console.log(`Can attend ${check([1, 3, 5, 7], [2, 4, 6, 8])} lectures`);
// => Can attend 4 lectures
