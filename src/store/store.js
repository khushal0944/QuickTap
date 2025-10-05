import { configureStore } from "@reduxjs/toolkit";
import bestScoreReducer from "../slices/bestScoreSlice";
import userReducer from "../slices/userSlice";
import scoreReducer from "../slices/scoreSlice";
import themeReducer from "../slices/themeSlice";
import muteAudioReducer from "../slices/muteAudioSlice"

const store = configureStore({
	reducer: {
		bestOverAll: bestScoreReducer,
		user: userReducer,
		currentScores: scoreReducer,
		themes: themeReducer,
        muteAudio: muteAudioReducer
	},
});
export default store;
