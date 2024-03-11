import cn from 'classnames'
import { FormEvent, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaUnlockAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../store/store'
import { tasksActions } from '../../../store/tasks.slice'
import { login } from '../../../store/user.slice'
import styles from './Login.module.css'

export type LoginForm = {
	email: { value: string }
	password: { value: string }
}

export const Login = () => {
	const [passwordVisible, setPasswordVisible] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	)

	useEffect(() => {
		if (isAuthenticated) navigate('/')
	}, [isAuthenticated, navigate])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & LoginForm
		const { email, password } = target
		await sendLogin(email.value, password.value)
	}

	const sendLogin = async (email: string, password: string) => {
		const data = await dispatch(login({ email, password }))
		if (data.meta.requestStatus == 'fulfilled') alert('Login Success')
		if (data) dispatch(tasksActions.getTasks(data.payload.tasks))
	}

	const togglePasswordVisibility = () => {
		setPasswordVisible(prevVisible => !prevVisible)
	}

	return (
		<div className={cn(styles['login-page'])}>
			<form className={cn(styles['form'])} action='#' onSubmit={submit}>
				<div className={cn(styles['inputs'])}>
					<h2 className={cn(styles['header'])}>Login</h2>
					<div className={cn(styles['email-input'])}>
						<FaUser className={cn(styles['icon'])} />
						<input type='text' placeholder='Email' name='email' />
					</div>
					<div className={cn(styles['password-input'])}>
						<FaUnlockAlt className={cn(styles['icon'])} />
						<input
							type={passwordVisible ? 'text' : 'password'}
							placeholder='Password'
							name='password'
						/>
						<span
							className={cn(styles['password-toggle'])}
							onClick={togglePasswordVisibility}
						>
							{passwordVisible ? (
								<FaEye className={cn(styles['eye-icon'])} />
							) : (
								<FaEyeSlash className={cn(styles['eye-icon'])} />
							)}
						</span>
					</div>
				</div>

				<div className={cn(styles['buttons'])}>
					<button className={cn(styles['btn'])} type='submit'>
						Login
					</button>
					<div className={cn(styles['noacc-container'])}>
						<p className={cn(styles['text'])}>don't have an account?</p>
						<NavLink to={'/auth/register'} className={cn(styles['link'])}>
							Register
						</NavLink>
					</div>
				</div>
			</form>
		</div>
	)
}
