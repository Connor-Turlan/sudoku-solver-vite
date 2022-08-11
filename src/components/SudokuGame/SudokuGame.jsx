import { useEffect, useContext } from "react";
import {
	SudokuContext,
	SudokuContextProvider,
} from "../../contexts/SudokuContext";
import SudokuBox from "./SudokuBox/SudokuBox";
import styles from "./SudokuGame.module.scss";

function SudokuGame() {
	const { gameState } = useContext(SudokuContext);

	useEffect(() => {
		console.log("update");
	}, [gameState]);

	return (
		<SudokuContextProvider>
			<main className={styles.SudokuGame}>
				{[...Array(9).keys()].map((childIndex) => (
					<SudokuBox key={`box_${childIndex}`} index={childIndex} />
				))}
			</main>
		</SudokuContextProvider>
	);
}

export default SudokuGame;
