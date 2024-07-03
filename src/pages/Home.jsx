import { Link } from "react-router-dom";
import InputUser from "../components/inputUser";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import ThemeComponent from "../components/ThemeComponent";
import { deleteBestScores } from "../slices/bestScoreSlice";
import { deleteUser } from "../slices/userSlice";
import { setUserName } from "../slices/userSlice";

export default function Home() {
	const userName = useSelector((state) => state.user.userName);
	const [showUserStats, setShowUserStats] = useState(false);
	const gamesPlayed = useSelector((state) => state.user.gamesPlayed);
	const boxClicked = useSelector((state) => state.user.boxClicked);
	const bestAvgTime = useSelector((state) => state.bestOverAll.bestAvgTime);
	const bestScore = useSelector((state) => state.bestOverAll.bestScore);
	const audioRef = useRef(null);
	const [editButton, setEditButton] = useState(false);
	const dispatch = useDispatch();
	const [input, setInput] = useState(userName);
	function DeleteUser() {
		dispatch(deleteBestScores());
		dispatch(deleteUser());
		window.location.reload();
	}

	useEffect(() => {
		const handlePopState = () => {
			window.history.pushState(null, null, window.location.pathname);
		};
		window.history.pushState(null, null, window.location.pathname);
		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	const [showError, setShowError] = useState(false);
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
		setEditButton((prev) => !prev);
		setShowError(false);
		dispatch(setUserName(input));
	}

	const playSound = () => {
		audioRef.current = new Audio("./sound1.mp3");
		audioRef.current.volume = 0.8;
		audioRef.current.play();
	};

	const showUserDetails = () => {
		playSound();
		setShowUserStats((prev) => !prev);
	};

	useEffect(() => {
		if (
			Number(input) ||
			input.trim().length < 3 ||
			input.trim().length > 20 ||
			input.trim() === ""
		) {
			setShowError(true);
			return;
		}
		setShowError(false);
	}, [input]);

	return (
		<div className="w-full min-h-screen max-h-fit flex dark:bg-gray-950 justify-center bg-pink-100">
			<div
				id="themeButton"
				className="absolute right-4 gap-4 top-4 flex items-center "
			>
				<ThemeComponent />
			</div>
			<div
				id="mainBox"
				className="text-center h-fit py-4 xs:max-w-2xl max-w-xs w-11/12 px-4 mt-9"
			>
				<h1 className="text-5xl font-semibold dark:text-white">
					Reaction{" "}
					<span className="text-red-700 dark:text-red-500 font-black">
						!
					</span>
				</h1>
				<p className="mt-2 text-lg dark:text-white">
					Test And Improve Your Reflexes
				</p>
				{!userName && (
					<div>
						<h1 className="mt-8 text-xl dark:text-white">
							Please Enter UserName First
						</h1>
						<InputUser />
					</div>
				)}
				{userName && !showUserStats && (
					<Link to={"/game"}>
						<button
							onClick={playSound}
							className=" w-full dark:bg-gray-800 hover:dark:bg-gray-900 hover:dark:border-white dark:border-[#727272] shadow-xl dark:text-cyan-300 bg-[#f9f8b0] mt-16 hover:scale-105 transition hover:transition rounded-xl border-4 border-black  h-20 "
						>
							<i className="ri-play-large-fill text-4xl"></i>
						</button>
					</Link>
				)}
				{userName && !showUserStats && (
					<button
						onClick={showUserDetails}
						className=" w-full mt-8 dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-cyan-300 hover:dark:border-white dark:border-[#727272] shadow-xl bg-[#f9f8b0] hover:scale-105 transition hover:transition rounded-xl border-4 border-black  h-20 "
					>
						<i className="ri-user-fill text-4xl"></i>
					</button>
				)}
				{showUserStats && (
					<button
						onClick={showUserDetails}
						className=" w-full mt-8 dark:border-[#727272] shadow-xl bg-[#f9f8b0] hover:scale-105 transition hover:transition rounded-xl border-4 border-black  h-20  dark:bg-gray-800 hover:dark:bg-gray-900 hover:dark:border-white dark:text-cyan-300  "
					>
						<i className="ri-home-2-fill text-4xl"></i>
					</button>
				)}
				{showUserStats && (
					<div>
						<div
							id="mainBox"
							className="w-full text-lg p-2 text-center my-7"
						>
							<form>
								<h1 className="text-5xl drop-shadow-md w-full dark:text-gray-100">
									{editButton ? (
										<input
											type="text"
											placeholder="New Username"
											value={input}
											className="w-full dark:bg-gray-800 dark:focus-within:border-white dark:border-[#727272] outline-none dark:focus-within:bg-gray-900 dark:placeholder:text-gray-300 dark:text-white border-black border-2 rounded-xl p-2 text-2xl"
											onInput={(e) =>
												setInput(e.target.value)
											}
										/>
									) : (
										`Hello ${userName}`
									)}
								</h1>
								{showError && editButton && (
									<p className="text-red-700 mt-2 dark:text-red-500 text-2xl">
										Invalid User Name
									</p>
								)}
								{!editButton && (
									<button
										className="text-4xl mr-5 mt-5 text-blue-700"
										onClick={() =>
											setEditButton((prev) => !prev)
										}
									>
										<i className="ri-edit-line"></i>
									</button>
								)}
								{editButton && (
									<button
										type="submit"
										className="text-4xl mr-5 mt-5 text-blue-700"
										onClick={(e) => handleSubmit(e)}
									>
										<i className="ri-save-3-line"></i>
									</button>
								)}
								<button
									className="text-4xl text-red-700"
									onClick={DeleteUser}
								>
									<i className="ri-delete-bin-line"></i>
								</button>
							</form>
							<div id="YourScore" className="flex w-full mt-16">
								<div id="part-1" className="w-1/2">
									<h1 className="text-gray-500 dark:text-gray-300">
										Games Played
									</h1>
									<h1 className="text-6xl text-rose-900 dark:text-rose-600">
										{gamesPlayed}
									</h1>
								</div>
								<div id="part-2" className="w-1/2">
									<h1 className="text-gray-500 dark:text-gray-300">
										Squares Clicked
									</h1>
									<h1 className="text-6xl text-rose-900 dark:text-rose-600">
										{boxClicked}
									</h1>
								</div>
							</div>
							<div id="bestScores" className="flex w-full mt-8 ">
								<div id="part-1" className="w-1/2">
									<h1 className="text-gray-500 dark:text-gray-300">
										Best Score
									</h1>
									<h1 className="text-5xl dark:text-gray-200">
										{bestScore}
									</h1>
								</div>
								<div id="part-2" className="w-1/2">
									<h1 className="text-gray-500 dark:text-gray-300">
										Avg. Reaction Time
									</h1>
									<h1 className="text-5xl dark:text-gray-200">
										{bestAvgTime === 0 ? "-" : bestAvgTime}
										<span className="text-2xl dark:text-gray-300 text-gray-500">
											{bestAvgTime === 0 ? "" : "ms"}
										</span>
									</h1>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
