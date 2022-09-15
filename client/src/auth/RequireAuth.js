import React from 'react';
//import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import Header from '../components/Header';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();
	// const location = useLocation();

	// return authed === true ? (
	// 	children
	// ) : (
	// 	<Navigate to='/' replace state={{ path: location.pathname }} />
	// );
	return (
		<div>
			{/* If app is loaded, we are passing the user and isAuthenticated values as a global state */}
			{authed ? (
				children
			) : (
				<div>
					<Header />
					<h1>Loading...</h1>
				</div>
			)}
		</div>
	);
};
