import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
    userData: any | null;
    loggedIn: boolean;
}

const initialState: AuthState = {
    userData: null,
    loggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<any>) => {
            state.loggedIn = true;
            state.userData = action.payload;
        },
        signOut: (state) => {
            state.loggedIn = false;
            state.userData = null;
        }
    }
})

export const { signIn, signOut } = authSlice.actions;

// Selectors
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
