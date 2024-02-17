
import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils";

const initialState = getLocalStorage('token') ? getLocalStorage('token'):  null

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state = null;
            setLocalStorage('token', JSON.stringify(state));
            return state;
        },
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer