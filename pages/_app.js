/* eslint-disable react/jsx-props-no-spreading */
/* eslint react/prop-types: 0 */

import App from 'next/app';
import { StoreProvider } from 'easy-peasy';

import store from '../store';

function MyApp({ Component, pageProps, user }) {
	if (user) {
		// store user value i.e 'email' in the store by calling an action
		store.getActions().user.setUser(user);
	}
	return (
		<StoreProvider store={store}>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;

MyApp.getInitialProps = async appContext => {
	const appProps = await App.getInitialProps(appContext);
	let user = null;
	// retreive the user value from the server
	if (
		appContext.ctx.req &&
		appContext.ctx.req.session &&
		appContext.ctx.req.session.passport &&
		appContext.ctx.req.session.passport.user
	) {
		user = appContext.ctx.req.session.passport.user;
	}
	return { ...appProps, user };
};
