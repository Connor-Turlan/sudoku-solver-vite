import styles from "./App.module.scss";
import SudokuGame from "./components/SudokuGame/SudokuGame";
import SudokuPuzzle from "./components/SudokuGame/SudokuPuzzle/SudokuPuzzle";

function App() {
	const getState = () => {};

	return (
		<div className={styles.App}>
			<SudokuGame />
			<button>Solve</button>
		</div>
	);
}

export default App;
