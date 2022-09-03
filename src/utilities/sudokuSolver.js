const getRowAndColIndex = (box, cell) => {
	return (
		Math.floor(box / 3) * 27 +
		(box % 3) * 3 +
		Math.floor(cell / 3) * 9 +
		(cell % 3)
	);
};

const getRow = (box, cell) => {
	return Math.floor(getRowAndColIndex(box, cell) / 9);
};

const getCol = (box, cell) => {
	return getRowAndColIndex(box, cell) % 9;
};

// convert a box puzzle into a row puzzle and vice versa.
export const convert = (puzzle) => {
	const newPuzzle = Array(9)
		.fill(undefined)
		.map(() => new Array(9));

	// map the box column puzzle.
	puzzle.forEach((box, boxIndex) =>
		box.forEach((cell, cellIndex) => {
			let row = getRow(boxIndex, cellIndex);
			let col = getCol(boxIndex, cellIndex);
			newPuzzle[row][col] = puzzle[boxIndex][cellIndex];
		})
	);

	return newPuzzle;
};

const getPuzzleRow = (puzzle, i) => {
	return puzzle[i];
};

const getPuzzleColumn = (puzzle, i) => {
	return puzzle.map((row) => row[i]);
};

const getPuzzleBox = (puzzle, i) => {
	return [...Array(9).keys()].map((j) => {
		let row = getRow(i, j);
		let col = getCol(i, j);
		return puzzle[row][col];
	});
};

const usedInRow = (puzzle, row, num) => {
	return getPuzzleRow(puzzle, row).includes(num);
};

const usedInCol = (puzzle, col, num) => {
	return getPuzzleColumn(puzzle, col).includes(num);
};

const usedInBox = (puzzle, x, y, num) => {
	return getPuzzleBox(puzzle, y * 3 + x).includes(num);
};

const isSafe = (puzzle, row, col, num) => {
	/* 
	let urow = usedInRow(puzzle, row, num);
	let ucol = usedInCol(puzzle, col, num);
	let ubox = usedInBox(puzzle, Math.floor(col / 3), Math.floor(row / 3), num);
	console.log(row, col, num, puzzle[row]);
	console.log(Math.floor(row / 3), Math.floor(col / 3));
	console.log(`- ${row} | ${col} n: ${num}`, urow, ucol, ubox); 
	*/
	return (
		!usedInRow(puzzle, row, num) &&
		!usedInCol(puzzle, col, num) &&
		!usedInBox(puzzle, Math.floor(col / 3), Math.floor(row / 3), num)
	);
};

// get the index of the first free location in the puzzle.
const getUnassignedLocation = (puzzle) => {
	let index = puzzle.flat().indexOf(0);
	return index >= 0 ? [Math.floor(index / 9), index % 9] : [9, 9];
};

const solveRowedPuzzle_recursive = (puzzle) => {
	// get the next free cell.
	const [row, col] = getUnassignedLocation(puzzle);

	// if the cell is 9,9, the sudoku is solved.
	if (row == 9 && col == 9) {
		console.log("success");
		return true;
	}

	// try insert 1 thru 9
	for (let i = 1; i <= 9; i++) {
		if (isSafe(puzzle, row, col, i)) {
			puzzle[row][col] = i;
			if (solveRowedPuzzle_recursive([...puzzle])) {
				return true;
			}
		}
	}

	// if we can't insert a number, the current solve is wrong. reset this cell and return.
	puzzle[row][col] = 0;
	return false;
};

// output the rows, cols, and boxes for a given puzzle.
export function testPuzzle(puzzle) {
	const rowedPuzzle = convert(puzzle);

	console.log("rows: ");
	rowedPuzzle.forEach((row, i) => {
		console.log(getPuzzleRow(rowedPuzzle, i).toString());
	});

	console.log("columns: ");
	for (let i = 0; i < 9; i++) {
		console.log(getPuzzleColumn(rowedPuzzle, i).toString());
	}

	console.log("box: ");
	for (let i = 0; i < 9; i++) {
		console.log(getPuzzleBox(rowedPuzzle, i).toString());
	}
}

// change all falsey value to zeroes.
const filterPuzzle = (puzzle) => {
	return puzzle.map((row) => row.map((num) => (num ? num : 0)));
};

// solve a box formatted sudoku puzzle.
const solvePuzzle = (puzzle) => {
	const rowedPuzzle = convert(filterPuzzle(puzzle));
	console.log("solving puzzle:", rowedPuzzle);
	const solved = solveRowedPuzzle_recursive(rowedPuzzle);
	if (solved) {
		console.log("solved puzzle:", rowedPuzzle);
	} else {
		console.log("solve failed");
	}
	return solved ? convert(rowedPuzzle) : puzzle;
};

export default solvePuzzle;
