import cn from 'classnames'
import { FormEvent, useState } from 'react'
import { FaEye, FaEyeSlash, FaUnlockAlt, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store/store'
import { register } from '../../../store/user.slice'
import styles from './Register.module.css'

export type RegisterForm = {
	email: { value: string }
	password: { value: string }
}

export const Register = () => {
	const [passwordVisible, setPasswordVisible] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & RegisterForm
		const { email, password } = target
		console.log(email, password)
		await sendRegister(email.value, password.value)
	}

	const sendRegister = async (email: string, password: string) => {
		const data = await dispatch(register({ email, password }))
		if (data.meta.requestStatus == 'fulfilled') {
			alert('Register Success')
			navigate('/auth/login')
		}
	}
	const togglePasswordVisibility = () => {
		setPasswordVisible(prevVisible => !prevVisible)
	}

	return (
		<div className={cn(styles['register-page'])}>
			<form className={cn(styles['form'])} action='#' onSubmit={submit}>
				<div className={cn(styles['inputs'])}>
					<h2 className={cn(styles['header'])}>Register</h2>
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
						Register
					</button>
					<div className={cn(styles['haveacc-container'])}>
						<p className={cn(styles['text'])}>already have an account?</p>
						<NavLink to={'/auth/login'} className={cn(styles['link'])}>
							Login
						</NavLink>
					</div>
				</div>
			</form>
		</div>
	)
}
