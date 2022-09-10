import React from 'react';
import Header from '../components/Header';
import Login from './Login';
import SignUp from './SignUp';

function Home() {
	return (
		<div>
			<Header />
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the home page.(Public)</h2>
				<div className='flex gap-10 justify-center'>
					<Login />
					<SignUp />
				</div>
			</div>
		</div>
	);
}

export default Home;
