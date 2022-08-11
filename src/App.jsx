import { useState } from "react";
import styles from "./App.module.scss";
import SudokuPuzzle from "./components/SudokuPuzzle/SudokuPuzzle";
import { convert } from "./utilities/sudokuSolver";

function App() {
	/* const initial = Array(9)
		.fill(undefined)
		.map(() => new Array(9).fill(1)).map((box, boxIndex) =>
			box.map((cell, cellIndex) => boxIndex * 9 + cellIndex + 1)
		); */

	const initial = convert([
		[0, 4, 0, 2, 0, 1, 0, 6, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[9, 0, 5, 0, 0, 0, 3, 0, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[5, 0, 7, 0, 8, 0, 1, 0, 4],
		[0, 1, 0, 0, 0, 0, 0, 9, 0],
		[0, 0, 1, 0, 0, 0, 6, 0, 0],
		[0, 0, 0, 7, 0, 5, 0, 0, 0],
		[6, 0, 8, 9, 0, 4, 5, 0, 3],
	]);

	const [game, setGame] = useState(initial);

	const outputSudoku = () => {
		setGame(convert(game));
	};

	const solveSudoku = () => {
		setGame(convert(game));
	};

	return (
		<div className={styles.App}>
			<SudokuPuzzle state={game} setState={setGame} />
			<button onClick={outputSudoku}>Solve</button>
		</div>
	);
}

export default App;
