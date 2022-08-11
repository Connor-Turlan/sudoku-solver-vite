import { SudokuContextProvider } from "../../contexts/SudokuContext";
import SudokuPuzzle from "./SudokuPuzzle/SudokuPuzzle";
import styles from "./SudokuGame.module.scss";

function SudokuGame() {
	return (
		<SudokuContextProvider>
			<SudokuPuzzle />
		</SudokuContextProvider>
	);
}

export default SudokuGame;
