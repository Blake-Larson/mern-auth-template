import React from 'react';

export default function NewUser() {
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		password: '',
	});

	function handleChange(event) {
		const { name, value, type, checked } = event.target;

		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(formData);

		try {
			const response = await fetch('/newUser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='m-3 flex flex-col gap-3 items-center'
		>
			<label htmlFor='newUserName'>New User</label>
			<input
				id='newUserName'
				className='input input-bordered w-full max-w-xs'
				type='text'
				placeholder='Name'
				name='name'
				value={formData.name}
				onChange={handleChange}
			/>
			<input
				className='input input-bordered w-full max-w-xs'
				type='email'
				placeholder='Email'
				name='email'
				value={formData.email}
				onChange={handleChange}
			/>
			<input
				className='input input-bordered w-full max-w-xs'
				type='text'
				placeholder='Password'
				name='password'
				value={formData.password}
				onChange={handleChange}
			/>
			<button className='btn btn-primary max-w-xs'>Submit</button>
		</form>
	);
}
