import * as React from 'react';
import {useRouter} from "next/router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {wrapper} from "../../components/store";
import {useDispatch, useSelector, useStore} from "react-redux";
import {increment, decrement} from "../../services/counterSlice";

const Tools = props => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch()

    return (
        <div>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>
    );
}

export default Tools;