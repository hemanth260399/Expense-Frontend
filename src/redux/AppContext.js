import { configureStore } from "@reduxjs/toolkit";
import { reduxReducer } from "./AppReducer.js";

export let store = configureStore({
    reducer: { reduxReducer },
    devTools: true
}) 