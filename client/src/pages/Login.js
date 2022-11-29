import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import Header from '../components/Header';

function Login() {
	let navigate = useNavigate();

	const { handleLogin } = useAuth();

	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});
	const [clearMsg, setClearMsg] = React.useState(false);

	React.useEffect(() => {
		const clear = setTimeout(() => {
			setMsg({
				text: '',
				success: false,
			});
		}, 4000);

		return () => clearTimeout(clear);
	}, [clearMsg]);

	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setLoginData(prevloginData => ({
			...prevloginData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email: loginData.email,
					password: loginData.password,
				},
				url: `${process.env.REACT_APP_API_URL}/login`,
				withCredentials: true,
			});
			console.log('From Server:', response.data.user);
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			handleLogin(response.data.user);
			navigate('/dashboard');
		} catch (err) {
			console.log(err);
			setMsg(
				{
					text: err.response.data.message.msgBody,
					success: false,
				},
				setClearMsg(!clearMsg)
			);
		}
	};

	return (
		<div>
			<Header />
			<section className='flex flex-col items-center p-10 gap-5'>
				<h1 className='text-xl'>Welcome back!</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-2 w-full items-center'
				>
					<input
						type='text'
						name='email'
						placeholder='Email'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<div className='self-center mt-3'>
						<button className='btn btn-primary'>Log in</button>
					</div>
				</form>
				<div
					className={
						msg.success ? 'text-success text-center' : 'text-error text-center'
					}
				>
					{msg ? msg.text : ''}
				</div>
			</section>
		</div>
	);
}

export default Login;
