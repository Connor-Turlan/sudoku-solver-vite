import { useEffect } from "react";
import { useState } from "react";
import styles from "./InputSquare.module.scss";

function InputSquare({ initialValue, onUpdate }) {
	const [myValue, setMyValue] = useState(initialValue);
	const [isEditing, setEditing] = useState(false);

	const handleChange = (event) => {
		event.preventDefault();

		// validate and set the value.
		if (/[1-9]?/.test(event.target.value)) {
			setMyValue(event.target.value);
			setEditing(false);
		} else {
			setMyValue("");
		}
	};

	const enableEditing = () => {
		setEditing(true);
	};

	useEffect(() => {
		onUpdate(myValue);
	}, [myValue]);

	const inputStyle = isEditing
		? [styles.InputSquare__Editing, styles.InputSquare].join(" ")
		: styles.InputSquare;

	return (
		<>
			{isEditing ? (
				<input
					className={inputStyle}
					type="text"
					onChange={handleChange}
					value={myValue}
					maxLength={1}
				/>
			) : (
				<input
					className={inputStyle}
					type="button"
					onClick={enableEditing}
					value={myValue}
				/>
			)}
		</>
	);
}

export default InputSquare;
