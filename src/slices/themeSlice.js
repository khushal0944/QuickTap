import { createSlice } from "@reduxjs/toolkit";

const initialTheme = JSON.parse(localStorage.getItem("theme")) || "light";

const themeSlice = createSlice({
	name: "webPageTheme",
	initialState: {
		theme: initialTheme,
	},
	reducers: {
		changeTheme: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", JSON.stringify(state.theme));
		},
	},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
