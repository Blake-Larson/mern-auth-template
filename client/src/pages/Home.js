import React from 'react';
import Header from '../components/Header';
import Login from './Login';
import SignUp from './SignUp';
import useAuth from '../auth/useAuth';

function Home() {
	const { authed } = useAuth();

	return (
		<div>
			<Header />
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the home page.(Public)</h2>
				<div className='flex flex-col md:flex-row gap-10 justify-center'>
					{!authed && <Login />}
					{!authed && <SignUp />}
					{authed && 'You are logged in.'}
				</div>
			</div>
		</div>
	);
}

export default Home;
