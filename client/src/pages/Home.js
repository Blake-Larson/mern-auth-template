import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../auth/UseAuth';

function Home() {
	let navigate = useNavigate();

	const { onLogin } = useAuth();

	return (
		<div>
			<Header />
			<h2>Home (Public)</h2>
			<div onClick={() => navigate('/login')} className='btn btn-primary'>
				Log In
			</div>
			<div onClick={() => navigate('/signup')} className='btn btn-secondary'>
				Sign Up
			</div>
			<button type='button' onClick={onLogin}>
				Sign In
			</button>
		</div>
	);
}

export default Home;
