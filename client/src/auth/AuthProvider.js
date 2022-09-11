import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [token, setToken] = React.useState(null);

	function handleLogin(data) {
		setToken(data);
		const origin = location.state?.from?.pathname || '/dashboard';
		navigate(origin);
	}

	const handleLogout = () => {
		setToken(null);
	};

	const value = {
		token,
		handleLogin,
		onLogout: handleLogout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
