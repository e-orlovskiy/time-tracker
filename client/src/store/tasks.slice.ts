import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../helpers/api'
import { ITask } from '../inerfaces/tasks.interface'

export interface IUserTasksState {
	tasks: ITask[]
}

const initialState: IUserTasksState = {
	tasks: []
}

axios.defaults.withCredentials = true

export const addTasks = createAsyncThunk('/addTask', async (task: ITask) => {
	try {
		const response = await axios.post(`${PREFIX}/tasks/addTask`, {
			name: task.name,
			time: task.time
		})

		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			throw new Error(err.response?.data.message)
		}
	}
})

export const deleteTasks = createAsyncThunk(
	'/deleteTask',
	async (taskName: string) => {
		try {
			const response = await axios.delete(`${PREFIX}/tasks/deleteTask/`, {
				data: {
					name: taskName
				}
			})
			return response.data
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
)

export const updateTasks = createAsyncThunk('/updTask', async (task: ITask) => {
	try {
		const response = await axios.put(`${PREFIX}/tasks/updateTask`, {
			name: task.name,
			time: task.time
		})
		return response.data
	} catch (err) {
		if (err instanceof AxiosError) {
			throw new Error(err.response?.data.message)
		}
	}
})

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		getTasks: (state, action: PayloadAction<ITask[]>) => {
			console.log(action.payload)
			state.tasks = action.payload
		},
		addTask: (state, action: PayloadAction<ITask>) => {
			if (state.tasks.find(task => task.name === action.payload.name)) {
				return
			}
			state.tasks.push(action.payload)
		},
		removeTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(task => task.name !== action.payload)
		},
		updateTask: (
			state,
			action: PayloadAction<{ name: string; time: string }>
		) => {
			const { name, time } = action.payload

			const updatedTasks = state.tasks.map(task =>
				task.name === name ? { ...task, time } : task
			)

			// Заменяем старый массив новым
			return { ...state, tasks: updatedTasks }
		}
	}
})

export default tasksSlice.reducer
export const tasksActions = tasksSlice.actions
