import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import Header from '../components/Header';

function Dashboard() {
	const { token } = useAuth();
	return (
		<div>
			<Header />
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the Dashboard page. (Private)</h2>
				<div>Authenticated as {token._id}</div>
			</div>
		</div>
	);
}

export default Dashboard;
