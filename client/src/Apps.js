import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SignUp from './pages/SignUp';
import AuthProvider from './auth/AuthProvider';
import Navigation from './components/Navigation';
import ProtectedRoute from './auth/ProtectedRoute';
import Admin from './pages/Admin';

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<h1>React Router</h1>

				<Navigation />

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
					{/* <Route
						path='admin'
						element={
							<ProtectedRoute>
								<Admin />
							</ProtectedRoute>
						}
					/> */}

					<Route path='*' element={<NoMatch />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
