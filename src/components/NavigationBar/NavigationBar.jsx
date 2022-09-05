import { useEffect, useState } from "react";
import styles from "./NavigationBar.module.scss";

function NavigationBar({ className, children }) {
	const hide = () => {
		document.getElementById("navbarToggle").checked = false;
	};

	const navStyle = [, styles.NavigationBar].join(" ");

	return (
		<nav className={className}>
			{/* <input
				id="navbarToggle"
				type="checkbox"
				className={styles.NavigationBar__Toggle}
			/>
			<label
				className={styles.NavigationBar__ToggleLabel}
				htmlFor="NavigationBar__Menu"
			/> */}
			<div onClick={hide} className={styles.NavigationBar__Buttons}>
				{children}
			</div>
		</nav>
	);
}

export default NavigationBar;
