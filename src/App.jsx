import { useEffect } from "react";
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
	const [newspaperTitle, setTitle] = useState("...");

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

	useEffect(() => {
		const getName = async () => {
			const adjectivePromise = await fetch(
				"https://random-word-form.herokuapp.com/random/adjective",
				{ accept: "application/json" }
			);
			const nounPromise = await fetch(
				"https://random-word-form.herokuapp.com/random/noun",
				{ accept: "application/json" }
			);

			let adj = (await adjectivePromise.json())[0];
			let noun = (await nounPromise.json())[0];

			adj = adj.charAt(0).toUpperCase() + adj.slice(1);
			noun = noun.charAt(0).toUpperCase() + noun.slice(1);

			setTitle(`The ${adj} ${noun}`);
		};

		getName();
	}, []);

	return (
		<div className={styles.App}>
			<main className={styles.newspaper}>
				<h1 className={styles.newspaper__title}>{newspaperTitle}</h1>
				<NavigationBar className={styles.newspaper__subtitle}>
					<div>
						<div
							className={styles.newspaper__subtitle_button}
							onClick={clearGame}
						>
							Clear
						</div>
						<div
							className={styles.newspaper__subtitle_button}
							onClick={saveGame}
						>
							Save
						</div>
						<div
							className={styles.newspaper__subtitle_button}
							onClick={loadGame}
						>
							Load
						</div>
						<div
							className={styles.newspaper__subtitle_button}
							onClick={solveSudoku}
						>
							Solve
						</div>
						<div
							className={styles.newspaper__subtitle_button}
							onClick={testSudoku}
						>
							-Test-
						</div>
					</div>
				</NavigationBar>
				<main className={styles.Game}>
					<h2>Sudoku</h2>
					<SudokuPuzzle state={game} setState={setGame} />
				</main>
			</main>
		</div>
	);
}

export default App;
