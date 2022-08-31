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

const getPuzzleRow = (puzzle, i) => {
	return puzzle[i];
};

const getPuzzleColumn = (puzzle, i) => {
	return puzzle.flatMap((row) => row[i]);
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
	/* for (let i = y * 3; i <= y + 2; i++) {
		for (let j = x * 3; j <= x + 2; j++) {
			if (puzzle[i][j] == num) return true;
		}
	}
	return false; */
};

const isSafe = (puzzle, row, col, num) => {
	let urow = usedInRow(puzzle, row, num);
	let ucol = usedInCol(puzzle, col, num);
	let ubox = usedInBox(puzzle, Math.floor(row / 3), Math.floor(col / 3), num);
	/* console.log(row, col, num, puzzle[row]);
	console.log(Math.floor(row / 3), Math.floor(col / 3)); */
	console.log(`- ${row} | ${col} n: ${num}`, urow, ucol, ubox);
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

const solveRowedPuzzle_recursive = (puzzle) => {
	// get the next free cell.
	const [row, col] = getUnassignedLocation(puzzle);
	//console.log(row, col);

	// if the cell is 9,9, the sudoku is solved.
	if (row == 9 && col == 9) {
		console.log("success");
		return true;
	}

	// otherwise try insert 1 thru 9
	for (let i = 1; i <= 9; i++) {
		/* console.log(`try row:`, puzzle[row]); */
		if (isSafe(puzzle, row, col, i)) {
			puzzle[row][col] = i;
			if (solveRowedPuzzle_recursive([...puzzle])) {
				return true;
			}
		}
	}

	// reset this cell and return.
	console.log("unsuitable", `row: ${row}`, puzzle[row]);
	puzzle[row][col] = 0;
	return false;
};

export function testPuzzle(puzzle) {
	const rowedPuzzle = convert(puzzle);

	console.log("rows: ");
	rowedPuzzle.forEach((row, i) => {
		//console.log(row.toString());
		console.log(getPuzzleRow(rowedPuzzle, i).toString());
	});

	console.log("columns: ");
	for (let i = 0; i < 9; i++) {
		/* const col = rowedPuzzle.flatMap((row) => row[i]);
		console.log(col.toString()); */
		console.log(getPuzzleColumn(rowedPuzzle, i).toString());
	}

	console.log("box: ");
	for (let i = 0; i < 9; i++) {
		/* const box = [...Array(9).keys()].map((j) => {
			let row = getRow(i, j);
			let col = getCol(i, j);
			return rowedPuzzle[row][col];
		});
		console.log(box.toString()); */
		console.log(getPuzzleBox(rowedPuzzle, i).toString());
	}
}

const solvePuzzle = (puzzle) => {
	const rowedPuzzle = convert(puzzle);
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
