import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const propertiesSlice = createSlice({
    name: "properties",
    initialState: {
        theme: 0,
    },
    reducers: {
        themeSetDark: state => {
            state.theme = -1
        },
        themeSetLight: state => {
            state.theme = 1
        },
        themeSetAuto: state => {
            state.theme = 0
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", state, action.payload)
            return {
                ...state,
                ...action.payload.subject
            }
        }
    }
})
// Action creators are generated for each case reducer function
export const { themeSetDark, themeSetLight, themeSetAuto } = propertiesSlice.actions

export default propertiesSlice.reducer