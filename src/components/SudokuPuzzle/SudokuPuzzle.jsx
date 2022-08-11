import { createContext, useEffect, useState } from "react";
import SudokuBox from "./SudokuBox/SudokuBox";
import styles from "./SudokuPuzzle.module.scss";

export const SudokuContext = createContext();

function SudokuPuzzle({ initial, onUpdate }) {
	// create an empty sudoku grid.
	const game = Array(9)
		.fill(undefined)
		.map(() => new Array(9).fill(0));
	const [gameState, setGameState] = useState(initial || game);

	// update a specified cell in the gameState.
	const updateCell = (box, cell, value) => {
		const newGameState = gameState.slice();
		newGameState[box][cell] = value;
		setGameState(newGameState);
	};

	// return the game state using the provided onUpdate function.
	useEffect(() => {
		if (onUpdate) onUpdate(gameState);
	}, [gameState]);

	const context = { gameState, updateCell };

	return (
		<SudokuContext.Provider value={context}>
			<main className={styles.SudokuPuzzle}>
				{[...Array(9).keys()].map((childIndex) => (
					<SudokuBox key={`box_${childIndex}`} index={childIndex} />
				))}
			</main>
		</SudokuContext.Provider>
	);
}

export default SudokuPuzzle;
