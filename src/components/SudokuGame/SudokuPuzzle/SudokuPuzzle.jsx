import { useContext, useEffect } from "react";
import { SudokuContext } from "../../../contexts/SudokuContext";
import SudokuBox from "./SudokuBox/SudokuBox";
import styles from "./SudokuPuzzle.module.scss";

function SudokuPuzzle() {
	return (
		<main className={styles.SudokuPuzzle}>
			{[...Array(9).keys()].map((childIndex) => (
				<SudokuBox key={`box_${childIndex}`} index={childIndex} />
			))}
		</main>
	);
}

export default SudokuPuzzle;
