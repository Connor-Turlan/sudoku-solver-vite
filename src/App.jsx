import styles from "./App.module.scss";
import SudokuGame from "./components/SudokuGame/SudokuGame";

function App() {
	return (
		<div className={styles.App}>
			<SudokuGame />
		</div>
	);
}

export default App;
