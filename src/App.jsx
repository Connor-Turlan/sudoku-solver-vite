import styles from "./App.module.scss";
import InputSquare from "./components/InputSquare/InputSquare";
import SudokuBox from "./components/SudokuBox/SudokuBox";

function App() {
	return (
		<div className={styles.App}>
			<SudokuBox index={0} />
			{/* <InputSquare initialValue={0}></InputSquare> */}
		</div>
	);
}

export default App;
