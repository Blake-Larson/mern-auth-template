import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';

function Navigation() {
	const { authed, handleLogout } = useAuth();

	return (
		<nav className='flex gap-5'>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/dashboard'>Dashboard</NavLink>

			{authed && (
				<button type='button' onClick={handleLogout}>
					Sign Out
				</button>
			)}
		</nav>
	);
}

export default Navigation;
