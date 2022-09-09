import React from 'react';
import AuthContext from './AuthProvider';

const useAuth = () => {
	return React.useContext(AuthContext);
};
export default useAuth;
