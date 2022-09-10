import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	const location = useLocation();

	if (!token) {
		return <Navigate to='/home' replace state={{ from: location }} />;
	}

	return children ? children : <Outlet />;
};
