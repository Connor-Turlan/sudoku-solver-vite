import { useEffect, useContext, useState } from "react";
import { SudokuContext } from "../../../../../contexts/SudokuContext";
import InputSquare from "../../../../InputSquare/InputSquare";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ boxIndex, cellIndex, initialValue }) {
	const { gameState, setGameState } = useContext(SudokuContext);
	const [value, setValue] = useState(0);

	useEffect(() => {
		gameState[boxIndex][cellIndex] = value;
		setGameState(gameState);
	}, [value]);

	return (
		<InputSquare
			onUpdate={setValue}
			initialValue={gameState[boxIndex][cellIndex]}
		/>
	);
}

export default SudokuCell;
