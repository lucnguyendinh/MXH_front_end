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
        commentStart: (state) => {
            state.isFetching = true
        },
        commentSuccess: (state) => {
            state.success = true
            state.isFetching = false
        },
        commentFail: (state) => {
            state.error = true
            state.isFetching = false
        },
        likeStart: (state) => {
            state.isFetching = true
        },
        likeSuccess: (state) => {
            state.success = true
            state.isFetching = false
        },
        likeFail: (state) => {
            state.error = true
            state.isFetching = false
        },
        unLikeStart: (state) => {
            state.isFetching = true
        },
        unLikeSuccess: (state) => {
            state.success = true
            state.isFetching = false
        },
        unLikeFail: (state) => {
            state.error = true
            state.isFetching = false
        },
    },
})

export const {
    getStatusStart,
    getStatusSuccess,
    getStatusFail,
    commentStart,
    commentSuccess,
    commentFail,
    likeStart,
    likeSuccess,
    likeFail,
    unLikeStart,
    unLikeSuccess,
    unLikeFail,
} = statusSlice.actions

export default statusSlice.reducer
