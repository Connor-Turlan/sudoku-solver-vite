import SudokuCell from "./SudokuCell/SudokuCell";
import styles from "./SudokuBox.module.scss";

function SudokuBox({ index }) {
	return (
		<section className={styles.SudokuBox}>
			{[...Array(9).keys()].map((childIndex) => (
				<SudokuCell
					key={`cell_${index}_${childIndex}`}
					index={childIndex}
					initialValue={" "}
				/>
			))}
		</section>
	);
}

export default SudokuBox;
