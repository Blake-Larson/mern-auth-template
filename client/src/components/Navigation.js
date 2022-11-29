import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import SignOut from './buttons/SignOut';

function Navigation() {
	const { authed } = useAuth();

	return (
		<nav className='flex gap-5'>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/dashboard'>Dashboard</NavLink>

			{authed && (
				<div className='gap-3 hidden md:flex'>
					<SignOut color={'nuetral'} textColor={'nuetral'} />
				</div>
			)}
			{!authed && (
				<div className='hidden md:flex'>
					<div className='flex gap-5 items-center'>
						<NavLink to='/login' className=''>
							Login
						</NavLink>
						<NavLink to='/signup' className='btn btn-primary normal-case'>
							Sign Up
						</NavLink>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navigation;
