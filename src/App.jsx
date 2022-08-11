import styles from "./App.module.scss";
import SudokuPuzzle from "./components/SudokuPuzzle/SudokuPuzzle";

function App() {
	const getState = () => {};

	return (
		<div className={styles.App}>
			<SudokuPuzzle onUpdate={console.log} />
			<button>Solve</button>
		</div>
	);
}

export default App;
