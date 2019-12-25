import { useState } from 'react';
import axios from 'axios';

export default ({ showLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordconfirmation, setPasswordconfirmation] = useState('');

	const submit = () =>
		axios.post('/api/auth/register', {
			email,
			password,
			passwordconfirmation
		});

	return (
		<>
			<h2>Sign up</h2>
			<div>
				<form
					onSubmit={e => {
						e.preventDefault();
						submit();
					}}
				>
					<input
						id='email'
						type='text'
						placeholder='Email address'
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						id='password'
						type='password'
						placeholder='password'
						onChange={e => setPassword(e.target.value)}
					/>
					<input
						id='passwordconfirmation'
						type='password'
						placeholder='Enter password again'
						onChange={e => setPasswordconfirmation(e.target.value)}
					/>
					<button>Sign up</button>
					<p>
						Already have an account?{' '}
						<a href='#' onClick={() => showLogin()}>
							Log in
						</a>
					</p>
				</form>
			</div>
		</>
	);
};
