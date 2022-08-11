import { createContext, useEffect, useState } from "react";
import SudokuBox from "./SudokuBox/SudokuBox";
import styles from "./SudokuPuzzle.module.scss";

export const SudokuContext = createContext();

function SudokuPuzzle({ state, setState, onUpdate }) {
	// create an empty sudoku grid.

	if (!state)
		setState(
			Array(9)
				.fill(undefined)
				.map(() => new Array(9).fill(0))
		);

	// update a specified cell in the gameState.
	const updateCell = (box, cell, value) => {
		const newState = state.slice();
		newState[box][cell] = value;
		setState(newState);
	};

	// return the game state using the provided onUpdate function.
	useEffect(() => {
		if (onUpdate) onUpdate(state);
	}, [state]);

	const context = { state, updateCell };

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
