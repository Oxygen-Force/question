#!/usr/bin/env -S node --no-warnings --loader tsm

// After running `npm install` or `yarn` we can run the script with `src/index.ts`.
import prompts from 'prompts';

function range(start: number, end: number, step: number = 1): number[] {
	return new Array(Math.floor((end - start) / step) + 1).fill(0).map((_val, i) => start + i * step);
}

async function input() {
	const startTimes = [];
	const endTimes = [];
	const schedule = await prompts({
		type: 'number',
		name: 'value',
		message: 'How many lectures do you have?',
		min: 2
	});
	for (const _ of range(1, schedule.value)) {
		const lectures = await prompts([
			{
				type: 'number',
				name: 'start',
				message: `What is the start time of lecture ${_}?`
			},
			{
				type: 'number',
				name: 'end',
				message: `What is the end time of lecture ${_}?`
			}
		]);
		startTimes.push(lectures.start);
		endTimes.push(lectures.end);
	}
	return {
		startTimes,
		endTimes
	};
}

function check(start: number[], end: number[], callback?: (val: number) => unknown) {
	/**
	 * Local variables
	 */
	const left = {
		start: [],
		end: []
	};

	// Step 1: Iterate through the items.
	for (const [i, v] of start.entries()) {
		// Step 2: Filter the array to see if the timings conflict.
		const filtered = start.filter((_v, ind) => ind > i);
		// Step 3: If not, we return the exact values.
		if (!filtered.some((val) => end[i] > val)) {
			left.start.push(v);
			left.end.push(end[i]);
		}
	}
	// Step 4: if we provide a callback, we call it else we return the value.
	return callback ? callback(left.start.length) : left.start.length;
}

const { startTimes, endTimes } = await input();
check(startTimes, endTimes, (val) => console.log(`You can attend ${val} lectures`));
// or: console.log(`You can attend ${check(startTimes, endTimes)} lectures`);
