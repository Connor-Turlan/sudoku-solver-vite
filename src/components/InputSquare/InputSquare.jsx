import { useEffect } from "react";
import { useState } from "react";
import styles from "./InputSquare.module.scss";

function InputSquare({ value, onUpdate }) {
	/* const [myValue, setMyValue] = useState(initialValue); */
	const [isEditing, setEditing] = useState(false);

	const handleChange = (event) => {
		event.preventDefault();

		// validate and set the value.
		if (/[1-9]?/.test(event.target.value)) {
			onUpdate(event.target.value);
			setEditing(false);
		} else {
			onUpdate(event.target.value);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setEditing(false);
	};

	const handleClick = () => {
		onUpdate("");
		setEditing(true);
	};

	const baseStyle = styles.InputSquare;
	const editStyle = [styles.InputSquare__Editing, styles.InputSquare].join(
		" "
	);

	return (
		<>
			{isEditing ? (
				<form onSubmit={handleSubmit}>
					<input
						className={editStyle}
						type="text"
						onChange={handleChange}
						value={value}
						maxLength={1}
					/>
				</form>
			) : (
				<input
					className={baseStyle}
					type="button"
					onClick={handleClick}
					value={value}
				/>
			)}
		</>
	);
}

export default InputSquare;
