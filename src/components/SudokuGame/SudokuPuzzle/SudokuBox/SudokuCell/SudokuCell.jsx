import { useEffect, useContext, useState } from "react";
import { SudokuContext } from "../../../../../contexts/SudokuContext";
import InputSquare from "../../../../InputSquare/InputSquare";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ boxIndex, cellIndex, initialValue }) {
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
