import { useState } from "react";
import styles from "./App.module.scss";
import SudokuPuzzle from "./components/SudokuPuzzle/SudokuPuzzle";
import { convert } from "./utilities/sudokuSolver";

function App() {
	const initial = Array(9)
		.fill(undefined)
		.map(() => new Array(9).fill(1));

	const [game, setGame] = useState(
		initial.map((box, boxIndex) =>
			box.map(
				(cell, cellIndex) =>
					Math.floor(boxIndex / 3) * 27 +
					(boxIndex % 3) * 3 +
					Math.floor(cellIndex / 3) * 9 +
					(cellIndex % 3) +
					1
			)
		)
	);

	const outputSudoku = () => {
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
