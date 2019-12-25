import { useStoreActions, useStoreState } from 'easy-peasy';

import Header from './Header';
import Modal from './Modal';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

const Layout = ({ content }) => {
	//Current state
	const showModal = useStoreState(state => state.modals.showModal);
	const showLoginModal = useStoreState(state => state.modals.showLoginModal);
	const showRegistrationModal = useStoreState(
		state => state.modals.showRegistrationModal
	);
	//Actions
	const setHideModal = useStoreActions(
		actions => actions.modals.setHideModal
	);
	const setShowRegistrationModal = useStoreActions(
		actions => actions.modals.setShowRegistrationModal
	);
	const setShowLoginModal = useStoreActions(
		actions => actions.modals.setShowLoginModal
	);

	return (
		<div>
			<Header />
			<main>{content}</main>
			{showModal && (
				<Modal close={() => setHideModal()}>
					{showLoginModal && (
						<LoginModal
							showSignup={() => setShowRegistrationModal()}
						/>
					)}
					{showRegistrationModal && (
						<RegistrationModal
							showLogin={() => setShowLoginModal()}
						/>
					)}
				</Modal>
			)}
			<style jsx global>{`
				body {
					margin: 0;
					font-family: Roboto, -apple-system, BlinkMacSystemFont,
						Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans,
						Droid Sans, Helvetica Neue, sans-serif;
					font-size: 14px;
					line-height: 1.5;
					color: #333;
				}
				button {
					background-color: rgb(255, 90, 95);
					font-size: 13px;
					color: white;
					border: none;
					width: 100%;
					height: 40px;
					border-radius: 4px;
					cursor: pointer;
				}
				input[type='email'],
				input[type='password'],
				input[type='text'] {
					display: block;
					padding: 20px;
					font-size: 20px !important;
					width: 100%;
					border: 1px solid #ccc;
					border-radius: 4px;
					box-sizing: border-box;
					margin-bottom: 10px;
				}
			`}</style>
			<style jsx>{`
				main {
					position: relative;
					max-width: 56em;
					padding: 2em;
					background-color: white;
					margin: 0 auto;
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Layout;
