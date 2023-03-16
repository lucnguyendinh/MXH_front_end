import { createSlice } from '@reduxjs/toolkit'

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        isFetching: false,
        error: false,
        success: false,
        getStatus: {
            curenttStatus: null,
        },
    },
    reducers: {
        getStatusStart: (state) => {
            state.isFetching = true
        },
        getStatusSuccess: (state, action) => {
            state.success = true
            state.isFetching = false
            state.getStatus.curenttStatus = action.payload
        },
        getStatusFail: (state) => {
            state.error = true
            state.isFetching = false
        },
        upStatusStart: (state) => {
            state.isFetching = true
        },
        upStatusSuccess: (state) => {
            state.isFetching = false
            state.success = true
        },
        upStatusFail: (state) => {
            state.isFetching = false
            state.error = true
        },
    },
})

export const {
    getStatusStart,
    getStatusSuccess,
    getStatusFail,
    upStatusStart,
    upStatusSuccess,
    upStatusFail,
} = statusSlice.actions

export default statusSlice.reducer
