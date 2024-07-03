import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, defaultValue) => {
	try {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : defaultValue;
	} catch (error) {
		return defaultValue;
	}
};

const initialUserName = loadFromLocalStorage("userName", "");
const initialGamesPlayed = loadFromLocalStorage("gamesPlayed", 0);
const initialBoxClicked = loadFromLocalStorage("boxClicked", 0);

const initialState = {
	userName: initialUserName,
	gamesPlayed: initialGamesPlayed,
	boxClicked: initialBoxClicked,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.userName = action.payload;
			localStorage.setItem("userName", JSON.stringify(state.userName));
		},
		updateGamesPlayed: (state) => {
			state.gamesPlayed = state.gamesPlayed + 1;
			localStorage.setItem(
				"gamesPlayed",
				JSON.stringify(state.gamesPlayed)
			);
		},
		updateBoxClicked: (state, action) => {
			state.boxClicked = state.boxClicked + action.payload;
			localStorage.setItem(
				"boxClicked",
				JSON.stringify(state.boxClicked)
			);
		},
		deleteUser: () => {
			localStorage.removeItem("userName");
			localStorage.removeItem("gamesPlayed");
			localStorage.removeItem("boxClicked");
		},
	},
});

export const { updateBoxClicked, setUserName, updateGamesPlayed, deleteUser } =
	userSlice.actions;
export default userSlice.reducer;
