import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store/store'

export const RequireAuth = ({ children }: { children: ReactNode }) => {
	const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate to='/auth/login' replace />
	}
	//
	return children
}
