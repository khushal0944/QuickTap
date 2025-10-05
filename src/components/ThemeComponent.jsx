import { changeTheme } from "../slices/themeSlice";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ThemeComponent() {
	const theme = useSelector((state) => state.themes.theme);
	const dispatch = useDispatch();
	const [inputTheme, setInputTheme] = useState(
		theme === "dark" ? true : false
	);
    const isMuted = useSelector(state => state.muteAudio.muted) || false;

	useEffect(() => {
		const htmlElement = document.querySelector("html");

		if (htmlElement) {
			htmlElement.classList.remove("dark", "light");
			htmlElement.classList.add(theme);
		}
	}, [theme]);
	const audioOnRef = useRef(null);
	const audioOffRef = useRef(null);

	useEffect(() => {
		audioOnRef.current = new Audio("./toggleOn.mp3");
		audioOffRef.current = new Audio("./toggleOff.mp3");
	}, []);

	function playSound() {
        console.log("Play Sound")
		if (!inputTheme) {
			audioOnRef.current.volume = 0.8;
			audioOnRef.current.play();
		} else {
			audioOffRef.current.volume = 0.8;
			audioOffRef.current.play();
		}
	}

	function handleThemeToggle(e) {
		setInputTheme(e);
		dispatch(changeTheme());
	}
	return (
		<>
			<label className="switch">
				<input
					type="checkbox"
					checked={inputTheme}
					onClick={() => {if(!isMuted) playSound();}}
					onChange={(e) => handleThemeToggle(e.currentTarget.checked)}
				/>
				<span className="slider"></span>
			</label>
		</>
	);
}
