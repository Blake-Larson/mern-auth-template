import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SignUp from './pages/SignUp';

export default function App() {
	// const [data, setData] = React.useState(null);

	// React.useEffect(() => {
	// 	console.log('Effect Ran');
	// 	async function getData() {
	// 		const res = await fetch('/api');
	// 		const data = await res.json();
	// 		setData(data);
	// 	}
	// 	getData();
	// }, []);
	// console.log(data);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	);
}
