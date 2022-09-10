import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

function Navigation() {
	const { token, onLogout } = useAuth();

	return (
		<nav className='flex gap-5'>
			<NavLink to='/home'>Home</NavLink>
			<NavLink to='/dashboard'>Dashboard</NavLink>

			{token && (
				<button type='button' onClick={onLogout}>
					Sign Out
				</button>
			)}
		</nav>
	);
}

export default Navigation;
