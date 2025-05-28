import { createSlice } from "@reduxjs/toolkit"

interface Token {
    token: string
}

const initialState: { token: Token | null } = {
    token: null
}

export const tokenSlice = createSlice({
    initialState,
    name: 'token',
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { addToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer