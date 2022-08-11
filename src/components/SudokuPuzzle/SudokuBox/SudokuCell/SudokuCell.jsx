import { useContext } from "react";
import InputSquare from "../../../InputSquare/InputSquare";
import { SudokuContext } from "../../SudokuPuzzle";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ boxIndex, cellIndex }) {
	const { gameState, updateCell } = useContext(SudokuContext);

	const onUpdate = (newValue) => {
		updateCell(boxIndex, cellIndex, newValue);
	};

	return (
		<InputSquare
			onUpdate={onUpdate}
			value={gameState[boxIndex][cellIndex] || ""}
		/>
	);
}

export default SudokuCell;
