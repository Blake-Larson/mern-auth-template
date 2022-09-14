import * as React from 'react';
import axios from 'axios';

const authContext = React.createContext();

function useAuth() {
	const [authed, setAuthed] = React.useState(false);
	const [user, setUser] = React.useState({});

	// React.useEffect(() => {
	// 	async function getAuth() {
	// 		try {
	// 			const response = await axios({
	// 				method: 'GET',
	// 				url: 'http://localhost:5000/authenticated',
	// 				withCredentials: true,
	// 			});
	// 			console.log('From Server:', response.data.user);
	// 			if (response.message === 'Authorized') {
	// 				setAuthed(true);
	// 				setUser(response.data.user);
	// 			}
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// 	getAuth();
	// }, []);

	return {
		authed,
		user,
		async handleLogin(loginData) {
			console.log(loginData, 'Login Attempt Sent');
			try {
				const response = await axios({
					method: 'POST',
					data: {
						email: loginData.email,
						password: loginData.password,
					},
					url: 'http://localhost:5000/login',
					withCredentials: true,
				});
				console.log('From Server:', response.data.user);
				setAuthed(true);
				setUser(response.data.user);
				return response;
			} catch (err) {
				console.log(err);
			}
		},
		handleLogout() {
			return new Promise(res => {
				setAuthed(false);
				res();
			});
		},
	};
}

export function AuthProvider({ children }) {
	const auth = useAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
	return React.useContext(authContext);
}
