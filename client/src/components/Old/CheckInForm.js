import React from 'react';

export default function CheckInForm() {
	const [formData, setFormData] = React.useState({
		attendance: '',
		payment: '',
	});

	function handleChange(event) {
		const { name, value, type, checked } = event.target;

		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(formData);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-3 border-base-300 bg-neutral rounded-box py-3 w-56 my-3'
		>
			<select
				name='attendance'
				onChange={handleChange}
				value={formData.attendance}
				className='select select-primary w-48 max-w-xs text-center'
			>
				<option>Attendance</option>
				<option>Present</option>
				<option>Absent</option>
				<option>Teacher Absent</option>
				<option>Both Absent</option>
			</select>
			<select
				name='payment'
				onChange={handleChange}
				value={formData.payment}
				className='select select-primary w-48 max-w-xs text-center'
			>
				<option>Payment</option>
				<option>Paid</option>
				<option>Not Paid</option>
				<option>Use Credit</option>
			</select>
			<button className='btn btn-primary'>Submit</button>
		</form>
	);
}
