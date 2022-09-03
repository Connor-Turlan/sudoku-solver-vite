import { useState } from "react";
import styles from "./App.module.scss";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SudokuPuzzle from "./components/SudokuPuzzle/SudokuPuzzle";
import solvePuzzle, { testPuzzle, convert } from "./utilities/sudokuSolver";

function App() {
	const empty = Array(9)
		.fill(0)
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
	const [savedGame, setSavedGame] = useState(undefined);

	const clearGame = () => {
		setGame(empty);
	};

	const saveGame = () => {
		setSavedGame([...game]);
	};

	const loadGame = () => {
		if (savedGame) setGame([...savedGame]);
		else console.log("saved game is null.");
	};

	const solveSudoku = () => {
		setGame(solvePuzzle(game));
	};

	const testSudoku = () => {
		testPuzzle(game);
	};

	return (
		<div className={styles.App}>
			<NavigationBar>
				<button onClick={clearGame}>Clear</button>
				<button onClick={saveGame}>Save</button>
				<button onClick={loadGame}>Load</button>
				<button onClick={solveSudoku}>Solve</button>
				<button onClick={testSudoku}>-Test-</button>
			</NavigationBar>
			<main className={styles.Game}>
				<SudokuPuzzle state={game} setState={setGame} />
			</main>
		</div>
	);
}

export default App;
