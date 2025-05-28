import { createSlice } from '@reduxjs/toolkit'
import type{ User } from '@/types/userType'

const initialState: { user: User | null } = {
    user: null
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer
