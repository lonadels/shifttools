import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
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
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer