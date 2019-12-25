export default ({ showLogin }) => (
	<>
		<h2>Sign up</h2>
		<div>
			<form
				onSubmit={e => {
					alert('register');
					e.preventDefault();
				}}
			>
				<input id='email' type='text' placeholder='Email address' />
				<input id='password' type='password' placeholder='password' />
				<input
					id='passwordconfirmation'
					type='password'
					placeholder='Enter password again'
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
