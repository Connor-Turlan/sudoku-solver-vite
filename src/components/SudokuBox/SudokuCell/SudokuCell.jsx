import { useEffect } from "react";
import { useState } from "react";
import InputSquare from "../../InputSquare/InputSquare";
import styles from "./SudokuCell.module.scss";

function SudokuCell({ index, initialValue }) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		console.log(index, value);
	}, [value]);

	return <InputSquare onUpdate={setValue} initialValue={initialValue} />;
}

export default SudokuCell;
