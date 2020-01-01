import { useStoreActions } from 'easy-peasy';
import axios from 'axios';
import { useState } from 'react';

export default ({ showSignup }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//store actions
	const setUser = useStoreActions(actions => actions.user.setUser);
	const setHideModal = useStoreActions(
		actions => actions.modals.setHideModal
	);
	return (
		<>
			<h2>Log in</h2>
			<div>
				<form
					onSubmit={async e => {
						try {
							const response = await axios.post(
								'/api/auth/login',
								{ email, password }
							);
							if (response.data.status === 'error') {
								return;
							}
							setUser(email);
							setHideModal();
						} catch (err) {
							alert(error.response.data.message);
							return;
						}
						e.preventDefault();
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
						placeholder='Password'
						onChange={e => setPassword(e.target.value)}
					/>
					<button>Log in</button>
					<p>
						Don't have an account yet?{' '}
						<a href='#' onClick={() => showSignup()}>
							{' '}
							Sign up
						</a>
					</p>
				</form>
			</div>
		</>
	);
};
/**
 * NOTE:
 *  Used javascript:; as the href value, to tell the
 * browser we’ll use JS to handle the click, and simultaneously avoid the URL to change if I use href="#"
 */
