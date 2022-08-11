import { useEffect, useContext, useState } from "react";
import { SudokuContext } from "../../../../contexts/SudokuContext";
import InputSquare from "../../../InputSquare/InputSquare";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ boxIndex, cellIndex, initialValue }) {
	const { gameState, setGameState } = useContext(SudokuContext);
	const [value, setValue] = useState(0);

	useEffect(() => {
		const newGameState = gameState;
		newGameState[boxIndex][cellIndex] = value;
		setGameState(newGameState);
	}, [value]);

	return (
		<InputSquare
			onUpdate={setValue}
			initialValue={gameState[boxIndex][cellIndex]}
		/>
	);
}

export default SudokuCell;
