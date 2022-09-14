import React from 'react';
import useAuth from '../auth/useAuth';

function Login() {
	// let navigate = useNavigate();

	const { handleLogin } = useAuth();

	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});

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
			const response = await handleLogin(loginData);
			setMsg({
				text: response.data.message.msgBody,
				success: true,
			});
		} catch (err) {
			console.log(err);
			setMsg({
				text: err.response.data.message.msgBody,
				success: false,
			});
		}
	};

	return (
		<div>
			<section className='flex flex-col items-center p-10'>
				<div className='card w-96 shadow-xl bg-neutral'>
					<div className='card-body'>
						<h1 className='card-title self-center mb-4 text-white'>
							Welcome back!
						</h1>
						<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
							<input
								type='text'
								name='email'
								placeholder='Email'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='password'
								name='password'
								placeholder='Password'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<div className='card-actions justify-center mt-4'>
								<button className='btn btn-primary'>Log in</button>
							</div>
						</form>
						<div
							className={
								msg.success
									? 'text-success text-center'
									: 'text-warning text-center'
							}
						>
							{msg ? msg.text : ''}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Login;
