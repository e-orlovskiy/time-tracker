import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../helpers/api'
import { IUser } from '../inerfaces/user.interface'

export interface IUserState {
	registerSuccess?: true | false
	registerErrorMessage?: string
	loginErrorMessage?: string
	profile: IUser | null
	isLoading: true | false
	isAuthenticated: true | false
}

const initialState: IUserState = {
	profile: null,
	isLoading: false,
	isAuthenticated: false
}

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post(
				`${PREFIX}/auth/login`,
				{
					email: params.email,
					password: params.password
				},
				{
					withCredentials: true
				}
			)
			return data
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
)

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password
			})

			return data
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.isAuthenticated = false
			state.profile = null
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined
		},
		clearRegisterError: state => {
			state.registerErrorMessage = undefined
		},
		clearRegisterSuccess: state => {
			state.registerSuccess = false
		}
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) return
			state.isAuthenticated = true
			state.profile = action.payload.user
		})
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message
		})
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) return
			state.registerSuccess = true
			state.loginErrorMessage = undefined
		})
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message
		})
	}
})

export default userSlice.reducer
export const userActions = userSlice.actions
