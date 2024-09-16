// react
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
    error: null,
}

// POST request to API to retrieve user profile information
export const fetchUserData = createAsyncThunk(
    'user/getUserData',
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:3001/api/v1/user/profile',
                headers: { Authorization: `Bearer ${token}` },
            })
            return res.data.body
        } catch (error) {
            // Return a custom error message if network error
            if (!error.response) {
                return rejectWithValue('ERR_NETWORK')
            }
            return rejectWithValue(error.response.data.message)
        }
    }
)

// PUT request is sent to the API to update the user profile with new data
export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios({
                method: 'put',
                url: 'http://localhost:3001/api/v1/user/profile',
                headers: { Authorization: `Bearer ${data.token}` },
                data: data.userNames,
            })
            return res.data.body
        } catch (error) {
            if (!error.response) {
                return rejectWithValue('ERR_NETWORK')
            }
            return rejectWithValue(error.response.data.message)
        }
    }
)

// user state management
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        emptyUserData(state) {
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.id = ''
            state.createdAt = ''
            state.updatedAt = ''
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.email = payload.email
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.id = payload.id
                state.createdAt = payload.createdAt
                state.updatedAt = payload.updatedAt
                state.error = null
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                if (action.error.message === 'ERR_NETWORK') {
                    state.error = 'Le serveur est inaccessible. Veuillez vérifier votre connexion réseau.'
                } else {
                    state.error = action.payload || 'Une erreur s\'est produite lors de la récupération des données utilisateur.'
                }
            })
            .addCase(updateUserData.fulfilled, (state, { payload }) => {
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.updatedAt = payload.updatedAt
                state.error = null
            })
            .addCase(updateUserData.rejected, (state, action) => {
                if (action.error.message === 'ERR_NETWORK') {
                    state.error = 'Le serveur est inaccessible. Impossible de mettre à jour les données utilisateur.'
                } else {
                    state.error = action.payload || 'Une erreur s\'est produite lors de la mise à jour des données utilisateur.'
                }
            })
    },
})

// selectors
export const getUserData = (state) => state.user

// actions
export const { emptyUserData } = userSlice.actions

// reducers
export const userReducer = userSlice.reducer