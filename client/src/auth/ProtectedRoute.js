import React from 'react';

const useAuth = () => {
	return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	const location = useLocation();

	if (!token) {
		return <Navigate to='/home' replace state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
