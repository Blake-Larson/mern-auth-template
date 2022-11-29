import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const navigate = useNavigate();

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

	const [signUpData, setSignUpData] = React.useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setSignUpData(prevSignUpData => ({
			...prevSignUpData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(signUpData, 'Sign Up Attempt Sent');
		try {
			const response = await axios({
				method: 'POST',
				data: {
					userName: signUpData.userName,
					email: signUpData.email,
					password: signUpData.password,
					confirmPassword: signUpData.confirmPassword,
				},
				url: `${process.env.REACT_APP_API_URL}/signup`,
				withCredentials: true,
			});
			console.log('From Server:', response);
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			navigate(`/login`);
		} catch (err) {
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
				<h1 className='text-xl'>Sign Up</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-2 w-full items-center'
				>
					<input
						type='text'
						name='userName'
						placeholder='Full Name*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='text'
						name='email'
						placeholder='Email*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='password'
						name='password'
						placeholder='Password*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<div className='self-center mt-3'>
						<button className='btn btn-primary'>Create User</button>
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

export default SignUp;
