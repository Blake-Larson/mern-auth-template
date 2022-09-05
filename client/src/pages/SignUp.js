import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function SignUp() {
	let navigate = useNavigate();

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
		console.log('Sign Up Attempt Sent');
		try {
			const response = await fetch('/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(signUpData),
			});
			const data = await response.json();
			console.log('From Server:', data, data.msgBody);
		} catch (err) {
			console.log(err);
		}
		navigate('/dashboard');
	};

	return (
		<div>
			<Header />
			<section className='flex flex-col items-center p-10'>
				<div className='card w-96 shadow-xl bg-neutral'>
					<div className='card-body'>
						<h1 className='card-title self-center mb-4 text-white'>SignUp</h1>
						<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
							<input
								type='text'
								id='userName'
								name='userName'
								placeholder='Username'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='text'
								id='email'
								name='email'
								placeholder='Email'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='password'
								id='password'
								name='password'
								placeholder='Password'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								placeholder='Confirm Password'
								onChange={handleFormChange}
								className='input input-bordered w-full max-w-xs'
							/>
							<div className='card-actions justify-center mt-4'>
								<button className='btn btn-primary'>Create User</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default SignUp;
