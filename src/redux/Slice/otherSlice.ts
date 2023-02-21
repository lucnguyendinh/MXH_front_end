import { createSlice } from '@reduxjs/toolkit'

export const otherSlice = createSlice({
    name: 'other',
    initialState: {
        stt: 1,
    },
    reducers: {
        updateStt: (state, action) => {
            state.stt = action.payload.stt
        },
    },
})

export const { updateStt } = otherSlice.actions

export default otherSlice.reducer
