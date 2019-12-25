export default ({ showSignup }) => (
	<>
		<h2>Log in</h2>
		<div>
			<form
				onSubmit={e => {
					alert('login');
					e.preventDefault();
				}}
			>
				<input id='email' type='text' placeholder='Email address' />
				<input id='password' type='password' placeholder='Password' />
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

/**
 * NOTE:
 *  Used javascript:; as the href value, to tell the
 * browser we’ll use JS to handle the click, and simultaneously avoid the URL to change if I use href="#"
 */
