// react
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// components
import { authSlice } from '../components/auth/AuthSlice'
import { userSlice } from '../components/user/UserSlice'

// initialize state
const state = {}

const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authSlice.reducer,
        user: userSlice.reducer,
    }),
})

export default store