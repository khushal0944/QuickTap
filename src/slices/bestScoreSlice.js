import { createSlice } from "@reduxjs/toolkit";

const initialAvgTime = JSON.parse(localStorage.getItem("bestAvgtime")) || 0;
const initialBestScore = JSON.parse(localStorage.getItem("bestscore")) || 0;

const initialState = {
	bestScore: initialBestScore,
	bestAvgTime: initialAvgTime,
};

const bestScoreSlice = createSlice({
	name: "BestScores",
	initialState,
	reducers: {
		updateBestScore: (state, action) => {
			state.bestScore = action.payload;
			localStorage.setItem("bestscore", JSON.stringify(state.bestScore));
		},
		updateBestAvgTime: (state, action) => {
			state.bestAvgTime = action.payload;
			localStorage.setItem(
				"bestAvgtime",
				JSON.stringify(state.bestAvgTime)
			);
		},
		deleteBestScores: () => {
			localStorage.removeItem("bestAvgtime");
			localStorage.removeItem("bestscore");
		},
	},
});

export const { updateBestScore, updateBestAvgTime, deleteBestScores } =
	bestScoreSlice.actions;

export default bestScoreSlice.reducer;
