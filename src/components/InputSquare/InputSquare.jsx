import { useEffect } from "react";
import { useState } from "react";
import styles from "./InputSquare.module.scss";

function InputSquare({ className, value, onUpdate, pattern }) {
	/* const [myValue, setMyValue] = useState(initialValue); */
	const [isEditing, setEditing] = useState(false);

	const handleChange = (event) => {
		event.preventDefault();
		onUpdate(event.target.value);
		setEditing(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setEditing(false);
	};

	const handleClick = (event) => {
		let isMobile = !window.matchMedia("(min-width: 601px)").matches;
		if (isMobile) {
			let value = parseInt(event.target.value) || 0;
			onUpdate((value + 1) % 10);
			setEditing(false);
		} else {
			onUpdate("");
			event.target.focus();
			setEditing(true);
		}
	};

	const baseStyle = [className || "", styles.InputSquare].join(" ");
	const editStyle = [
		className || "",
		styles.InputSquare__Editing,
		styles.InputSquare,
	].join(" ");

	return (
		<>
			<form onSubmit={handleSubmit}>
				{isEditing ? (
					<input
						className={editStyle}
						type="text"
						pattern={pattern}
						onChange={handleChange}
						value={value}
						maxLength={1}
					/>
				) : (
					<input
						className={baseStyle}
						type="button"
						onClick={handleClick}
						value={value}
					/>
				)}
			</form>
		</>
	);
}

export default InputSquare;
