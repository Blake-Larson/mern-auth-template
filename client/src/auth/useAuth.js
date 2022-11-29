import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const authContext = React.createContext();

function useAuth() {
	let navigate = useNavigate();

	const [authed, setAuthed] = React.useState(false);
	const [user, setUser] = React.useState({});

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					url: `${process.env.REACT_APP_API_URL}/authenticated`,
					withCredentials: true,
				});
				console.log('From Server:', response);
				if (response.status === 200) {
					setAuthed(true);
					setUser(response.data);
				} else {
					setAuthed(false);
					setUser({});
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return {
		authed,
		user,
		handleLogin(user) {
			setAuthed(true);
			setUser(user);
		},
		async handleLogout() {
			try {
				const response = await axios({
					method: 'GET',
					url: `${process.env.REACT_APP_API_URL}/logout`,
					withCredentials: true,
				});
				console.log('From Server:', response.data.message.msgBody);
				setAuthed(false);
				setUser(null);
				navigate('/');
			} catch (err) {
				console.log(err);
			}
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
