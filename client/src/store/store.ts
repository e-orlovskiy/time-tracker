import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasks.slice'
import userSlice from './user.slice'

export const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		user: userSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
