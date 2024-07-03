import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	score: 0,
	avgTime: 0,
};

const scoreSlice = createSlice({
	name: "scores",
	initialState,
	reducers: {
		updateScore: (state, action) => {
			state.score = action.payload;
		},
		updateAvgTime: (state, action) => {
			state.avgTime = action.payload;
		},
	},
});

export const { updateAvgTime, updateScore } = scoreSlice.actions;

export default scoreSlice.reducer;
