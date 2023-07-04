import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false,
        error: false,
        success: false,
        login: {
            currentUser: null,
        },
        register: {
            idUser: '',
        },
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.login.currentUser = action.payload
            state.error = false
        },
        loginFailed: (state) => {
            state.isFetching = false
            state.error = true
        },
        registerStart: (state) => {
            state.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.isFetching = false
            state.success = true
            state.error = false
            state.register.idUser = action.payload
        },
        registerFailed: (state) => {
            state.isFetching = false
            state.error = true
            state.success = false
        },
        registerNStart: (state) => {
            state.isFetching = true
        },
        registerNSuccess: (state, action) => {
            state.isFetching = false
            state.login.currentUser = action.payload
            state.success = true
            state.error = false
        },
        registerNFailed: (state) => {
            state.isFetching = false
            state.error = true
            state.success = false
        },
        logOutStart: (state) => {
            state.isFetching = true
        },
        logOutSuccess: (state) => {
            state.login.currentUser = null
            state.register.idUser = ''
            state.isFetching = false
            state.success = true
            state.error = false
        },
        logOutFailed: (state) => {
            state.isFetching = false
            state.error = true
            state.success = false
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    registerNStart,
    registerNSuccess,
    registerNFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
} = authSlice.actions

export default authSlice.reducer
