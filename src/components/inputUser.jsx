import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../slices/userSlice";

export default function InputUser() {
	const [input, setInput] = useState("");
	const [showError, setShowError] = useState(false);
	const dispatch = useDispatch();
	function handleSubmit(e) {
		e.preventDefault();
		if (
			Number(input) ||
			input.trim() === "" ||
			input.trim().length < 3 ||
			input.trim().length > 20
		) {
			setShowError(true);
			return;
		}
		setShowError(false);
		dispatch(setUserName(input));
		setInput("");
		window.location.reload();
	}

	let count = useRef(1);
	useEffect(() => {
		if (count.current === 1) {
			setShowError(false);
			count.current++;
			return;
		}
		if (
			Number(input) ||
			input.trim().length < 3 ||
			input.trim() === "" ||
			input.trim().length > 20
		) {
			setShowError(true);
			return;
		}
		setShowError(false);
	}, [input]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					className="dark:bg-gray-800 dark:focus-within:border-white dark:border-[#727272] outline-none dark:focus-within:bg-gray-900 dark:placeholder:text-gray-300 dark:text-white border-black border-2 w-8/12 mt-3 rounded-xl p-3 text-2xl"
					onInput={(e) => setInput(e.target.value)}
				/>
				<button
					type="submit"
					className={`${
						showError
							? "dark:bg-red-900 hover:dark:bg-red-950"
							: "dark:bg-blue-900 hover:dark:bg-blue-950"
					} hover:dark:border-white dark:border-[#dcdbdb] dark:text-gray-200 dark:text-2xl text-2xl hover:scale-105 w-8/12 transition hover:transition shadow-xl bg-[#f9f8b0]  rounded-xl p-2 text-black uppercase border-2 border-black m-3`}
				>
					submit
				</button>
				{showError && (
					<p className="text-red-700 dark:text-red-500 text-2xl">
						Invalid User Name
					</p>
				)}
			</form>
		</>
	);
}
