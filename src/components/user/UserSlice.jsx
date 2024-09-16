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
}

// POST request to API to retrieve user profile information
export const fetchUserData = createAsyncThunk(
    'user/getUserData',
    async (token) => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.data.body
    }
)

// PUT request is sent to the API to update the user profile with new data
export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (data) => {
        const res = await axios({
            method: 'put',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${data.token}` },
            data: data.userNames,
        })

        return res.data.body
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
                if (action.payload === 'ERR_NETWORK') {
                    state.error = 'Le serveur est inaccessible. Veuillez vérifier votre connexion réseau.';
                } else {
                    state.error = 'Une erreur s\'est produite lors de la récupération des données utilisateur.';
                }
            })
            .addCase(updateUserData.fulfilled, (state, { payload }) => {
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.updatedAt = payload.updatedAt
                state.error = null
            })
            .addCase(updateUserData.rejected, (state, action) => {
                if (action.payload === 'ERR_NETWORK') {
                    state.error = 'Le serveur est inaccessible. Impossible de mettre à jour les données utilisateur.';
                } else {
                    state.error = 'Une erreur s\'est produite lors de la mise à jour des données utilisateur.';
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