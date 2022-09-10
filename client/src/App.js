import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';

const App = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route
					path='dashboard'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</AuthProvider>
	);
};

export default App;
