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

const usedInRow = (puzzle, row, num) => {
	return puzzle[row].includes(num);
};

const usedInCol = (puzzle, col, num) => {
	return puzzle
		.map((row) => row.filter((col_item, col_index) => col_index === col))
		.includes(num);
};

const usedInBox = (puzzle, x, y, num) => {
	for (let i = y; i <= y + 3; i++) {
		for (let j = x; j <= x + 3; j++) {
			if (puzzle[j][i] == num) return true;
		}
	}
	return false;
};

const isSafe = (puzzle, row, col, num) => {
	let urow = usedInRow(puzzle, row, num);
	let ucol = usedInCol(puzzle, col, num);
	let ubox = usedInBox(puzzle, Math.floor(row / 3), Math.floor(col / 3), num);
	// console.log(urow, ucol, ubox);
	return !urow && !ucol && !ubox;
};
const getUnassignedLocation = (puzzle) => {
	//TODO: rewrite using Array.find()
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (puzzle[row][col] === 0) return [row, col];
		}
	}
	return [9, 9];
};

const solveRowedPuzzle = (puzzle) => {
	// get the next free cell.
	const [row, col] = getUnassignedLocation(puzzle);
	console.log(row, col);

	// if the cell is 9,9, the sudoku is solved.
	if (row == 9 && col == 9) return true;

	// otherwise try insert 1 thru 9
	for (let i = 1; i <= 9; i++) {
		if (isSafe(puzzle, row, col, i)) {
			puzzle[row][col] = i;
			if (solveRowedPuzzle(puzzle)) {
				return true;
			}
		}
	}

	// reset this cell and return.
	console.log("unsuitable", puzzle[0]);
	puzzle[row][col] = 0;
	return false;
};

const solvePuzzle = (puzzle) => {
	const rowedPuzzle = convert(puzzle);
	console.log("solving puzzle:", rowedPuzzle);
	solveRowedPuzzle(rowedPuzzle);
	console.log("solved puzzle:", rowedPuzzle);
	return rowedPuzzle ? convert(rowedPuzzle) : false;
};

export default solvePuzzle;
