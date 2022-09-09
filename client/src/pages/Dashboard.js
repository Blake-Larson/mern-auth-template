import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import useAuth from '../auth/UseAuth';

function Dashboard() {
	const { token } = useAuth();
	return (
		<div>
			<DashboardHeader />
			<h1>Dashboard</h1>
			<div>Authenticated as {token}</div>
		</div>
	);
}

export default Dashboard;
