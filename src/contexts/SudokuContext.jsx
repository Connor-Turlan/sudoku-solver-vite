import { createContext, useState } from "react";

export const SudokuContext = createContext();

export const SudokuContextProvider = ({ children }) => {
	const game = Array(9).fill(Array(9).fill(0));
	const [gameState, setGameState] = useState(game);

	const context = { gameState, setGameState };

	return (
		<SudokuContext.Provider value={context}>
			{children}
		</SudokuContext.Provider>
	);
};
