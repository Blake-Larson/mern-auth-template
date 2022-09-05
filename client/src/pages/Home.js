import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
	let navigate = useNavigate();

	return (
		<div>
			<Header />
			<div onClick={() => navigate('/login')} className='btn btn-primary'>
				Log In
			</div>
			<div onClick={() => navigate('/signup')} className='btn btn-secondary'>
				Sign Up
			</div>
		</div>
	);
}

export default Home;
