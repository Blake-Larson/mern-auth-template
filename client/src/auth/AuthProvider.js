import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [token, setToken] = React.useState(null);

	const handleLogin = async data => {
		const token = await data;

		setToken(token);

		const origin = location.state?.from?.pathname || '/dashboard';
		navigate(origin);
	};

	const handleLogout = () => {
		setToken(null);
	};

	const value = {
		token,
		onLogin: handleLogin,
		onLogout: handleLogout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
