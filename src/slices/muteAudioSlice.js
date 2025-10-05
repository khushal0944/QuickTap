import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    muted: JSON.parse(localStorage.getItem("AudioMuted")) || false
}

const muteAudioSlice = createSlice({
    name: "muteAudio",
    initialState,
    reducers: {
        changeMuted: (state) => {
            state.muted = !state.muted
            console.log("Current State Muted: ", state.muted)
            localStorage.setItem("AudioMuted", JSON.stringify(state.muted))
        }
    }
})

export const {changeMuted} = muteAudioSlice.actions
export default muteAudioSlice.reducer