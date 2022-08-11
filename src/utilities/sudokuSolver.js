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
	return puzzle.some((row) => row[col] === num);
};

const usedInBox = (puzzle, x, y, num) => {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (puzzle[x + j][y + i] === num) return true;
		}
	}
	return false;
};

const isSafe = (puzzle, row, col, num) => {
	let ubox = usedInBox(puzzle, Math.floor(row / 3), Math.floor(col / 3), num);
	return (
		!usedInRow(puzzle, row, num) && !usedInCol(puzzle, col, num) && !ubox
	);
};
const getUnassignedLocation = (puzzle) => {
	puzzle.forEach((row, row_index) =>
		row.forEach((col, col_index) => {
			if (col === 0) return [row_index, col_index];
		})
	);
	return [9, 9];
};

const solvePuzzle = (puzzle) => {
	const rowedPuzzle = convert(puzzle);

	// get the next free cell.

	// if the cell is 9,9, the sudoku is solved.

	// otherwise try insert 1 thru 9
};

export default solvePuzzle;
