import { useEffect } from "react";
import { createContext, useState } from "react";

export const SudokuContext = createContext();

export const SudokuContextProvider = ({ children }) => {
	const game = Array(9)
		.fill(undefined)
		.map(() => new Array(9).fill(0));

	const [gameState, setGameState] = useState(game);

	const handleClick = () => {
		console.log("blip");
		setGameState(
			gameState.map((box, box_index) =>
				box.map((cell, index) => box_index * 9 + index)
			)
		);
	};

	const updateCell = (box, cell, value) => {
		const newGameState = gameState.slice();
		newGameState[box][cell] = value;
		setGameState(newGameState);
	};

	const context = { gameState, setGameState, updateCell };

	return (
		<SudokuContext.Provider value={context}>
			{children}
		</SudokuContext.Provider>
	);
};
