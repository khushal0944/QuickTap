import "../style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function GameOver() {
	const score = useSelector((state) => state.currentScores.score);
	const avgTime = useSelector((state) => state.currentScores.avgTime);
	const bestScore = useSelector((state) => state.bestOverAll.bestScore);
	const bestAvgTime = useSelector((state) => state.bestOverAll.bestAvgTime);
	const theme = useSelector((state) => state.themes.theme);
	const navigate = useNavigate();

	useEffect(() => {
		let reloadCount = parseInt(localStorage.getItem("reloadCounts") || "0");
		reloadCount++;
		localStorage.setItem("reloadCounts", reloadCount.toString());
		if (reloadCount > 1) {
			navigate("/");
		}
		return () => {
			localStorage.removeItem("reloadCounts");
		};
	}, [navigate]);

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

	const playSound = () => {
		const audio = new Audio("./sound1.mp3");
		audio.volume = 0.7;
		audio.play();
	};

	useEffect(() => {
		const htmlElement = document.querySelector("html");

		if (htmlElement) {
			htmlElement.classList.remove("dark", "light");
			htmlElement.classList.add(theme);
		}
	}, [theme]);

	return (
		<div className="min-h-screen w-full flex justify-center dark:bg-zinc-900 h-fit bg-red-200">
			<div
				id="mainBox"
				className="min-w-fit h-fit w-2/5 text-lg p-2 text-center my-10"
			>
				<h1 className="text-5xl text-red-800 dark:text-red-400 mb-8 font-semibold uppercase">
					Game Over!
				</h1>
				<div id="YourScore" className="flex w-full">
					<div id="part-1" className="w-1/2">
						<h1 className="text-gray-500 dark:text-gray-300">
							Score
						</h1>
						<h1 className="text-6xl text-rose-900 dark:text-rose-600">
							{score}
						</h1>
					</div>
					<div id="part-2" className="w-1/2">
						<h1 className="text-gray-500 dark:text-gray-300">
							Avg. Reaction Time
						</h1>
						<h1 className="text-6xl text-rose-900 dark:text-rose-600">
							{avgTime}
							<span className="text-2xl dark:text-gray-300 text-gray-500">
								ms
							</span>
						</h1>
					</div>
				</div>
				<div id="bestScores" className="flex w-full mt-8 ">
					<div id="part-1" className="w-1/2">
						<h1 className="text-gray-500 dark:text-gray-300">
							Best
						</h1>
						<h1 className="text-5xl dark:text-gray-200">
							{bestScore}
						</h1>
					</div>
					<div id="part-2" className="w-1/2">
						<h1 className="text-gray-500 dark:text-gray-300">
							Best
						</h1>
						<h1 className="text-5xl dark:text-gray-200">
							{bestAvgTime === 0 ? "-" : bestAvgTime}
							<span className="text-2xl text-gray-500 dark:text-gray-300">
								{bestAvgTime === 0 ? "" : "ms"}
							</span>
						</h1>
					</div>
				</div>
				<Link to={"/"}>
					<button
						onClick={playSound}
						className="w-full shadow-xl bg-[#f9f8b0] dark:bg-gray-800 hover:dark:bg-gray-900 dark:border-[#727272] hover:dark:border-white mt-16 hover:scale-105 transition hover:transition rounded-xl border-4 dark:text-cyan-500 border-black py-2"
					>
						<i className="ri-home-2-fill text-5xl"></i>
					</button>
				</Link>
				<Link to={"/game"}>
					<button
						onClick={playSound}
						className="w-full shadow-xl bg-[#f9f8b0] mt-5 mb-10 hover:scale-105 transition hover:transition dark:border-[#727272] rounded-xl dark:bg-gray-800 hover:dark:bg-gray-900 hover:dark:border-white dark:text-cyan-500 border-4 border-black py-2"
					>
						<i className="ri-restart-line text-5xl"></i>
					</button>
				</Link>
				<hr
					className="bg-black dark:bg-white"
					style={{
						height: "2px",
					}}
				/>
			</div>
		</div>
	);
}
