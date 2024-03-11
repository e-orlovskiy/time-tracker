import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './components/Auth/Login/Login'
import { Register } from './components/Auth/Register/Register'
import { TaskList } from './components/Dashboard/TaskList/TaskList'
import { Error } from './components/Error/Error'
import { RequireAuth } from './helpers/RequireAuth'
import './index.css'
import { store } from './store/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<TaskList />
			</RequireAuth>
		)
	},
	{
		path: '/auth',
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '/*',
		element: <Error />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
