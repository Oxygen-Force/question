// Run this file via npm start or yarn start

class LectureManager {
	public start: number[];
	public end: number[];
	public main: number;
	public left = {
		start: [] as number[],
		end: [] as number[]
	};
	public messages: string[] = [];

	public check() {
		// Step 1: Iterate through the timings and remove one of the conflicting timing.
		this.iterate();
		// Step 2: Filter out the remaining timings.
		this.filter();
		// Step 3: Return how many lectures one can attend.
		return new Set(this.messages).size;
	}

	public setTimes(start: number[], end: number[]) {
		this.start = start;
		this.end = end;
		return this;
	}

	private iterate() {
		for (const [i, v] of this.start.entries()) {
			if (this.end[i] > this.start[i + 1]) {
				this.main = i;
				this.pushMessage(this.start[i], this.end[i]);
			} else {
				this.left.start.push(v);
				this.left.end.push(this.end[i]);
			}
		}
	}

	private filter() {
		const filtered = this.left.start.filter((_v, i, a) => {
			if (a.length === 1) return this.end[this.main] > a[i];
			return this.end[this.main] > a[i + 1];
		});
		for (const v of filtered) {
			const i = this.left.start.indexOf(v);
			return this.pushMessage(this.left.start[i], this.left.end[i]);
		}
	}

	private pushMessage(start: number, end: number) {
		this.messages.push(`${start} - ${end}`);
	}
}

const manager = new LectureManager();
console.log(`Can attend ${manager.setTimes([1, 3, 5], [2, 6, 7]).check()} lectures`);
// => Can attend 2 lectures
console.log(`Can attend ${manager.setTimes([1, 3, 5, 8, 9], [2, 6, 7, 10, 11]).check()} lectures`);
// => Can attend 3 lectures
console.log(`Can attend ${manager.setTimes([1, 3, 5], [2, 4, 6]).check()} lectures`);
// => Can attend 3 lectures
