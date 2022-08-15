import { useState } from "react";
import styles from "./App.module.scss";
import SudokuPuzzle from "./components/SudokuPuzzle/SudokuPuzzle";
import solvePuzzle, { convert } from "./utilities/sudokuSolver";

function App() {
	const empty = Array(9)
		.fill(undefined)
		.map(() => new Array(9).fill(0));

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
	const [savedGame, setSavedGame] = useState(empty.splice());

	const clearGame = () => {
		setGame(empty);
	};

	const saveGame = () => {
		setSavedGame([...game]);
	};

	const loadGame = () => {
		setGame([...savedGame]);
	};

	const solveSudoku = () => {
		setGame(solvePuzzle(game));
	};

	return (
		<div className={styles.App}>
			<SudokuPuzzle state={game} setState={setGame} />
			<button onClick={clearGame}>Clear</button>
			<button onClick={saveGame}>Save</button>
			<button onClick={loadGame}>Load</button>
			<button onClick={solveSudoku}>Solve</button>
		</div>
	);
}

export default App;
