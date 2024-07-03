import { configureStore } from "@reduxjs/toolkit";
import bestScoreSlice from "../slices/bestScoreSlice";
import userSlice from "../slices/userSlice";
import scoreSlice from "../slices/scoreSlice";
import themeReducer from "../slices/themeSlice";

const store = configureStore({
	reducer: {
		bestOverAll: bestScoreSlice,
		user: userSlice,
		currentScores: scoreSlice,
		themes: themeReducer,
	},
});
export default store;
