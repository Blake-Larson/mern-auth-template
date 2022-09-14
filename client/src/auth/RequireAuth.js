import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();
	const location = useLocation();

	return authed === true ? (
		children
	) : (
		<Navigate to='/' replace state={{ path: location.pathname }} />
	);
};
