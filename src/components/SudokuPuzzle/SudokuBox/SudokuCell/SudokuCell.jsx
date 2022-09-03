import { useContext } from "react";
import InputSquare from "../../../InputSquare/InputSquare";
import { SudokuContext } from "../../SudokuPuzzle";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ boxIndex, cellIndex }) {
	const { state, updateCell } = useContext(SudokuContext);

	const onUpdate = (newValue) => {
		updateCell(boxIndex, cellIndex, parseInt(newValue));
	};

	return (
		<InputSquare
			className={styles.SudokuCell}
			onUpdate={onUpdate}
			value={state[boxIndex][cellIndex] || ""}
		/>
	);
}

export default SudokuCell;
