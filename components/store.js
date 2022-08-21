import { configureStore, createSlice } from "@reduxjs/toolkit"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import counterReducer from "../services/counterSlice";
import propertiesReducer from "../services/propertiesSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            counter: counterReducer,
            properties: propertiesReducer,
        },
        devTools: true
    })

export const wrapper = createWrapper(makeStore)