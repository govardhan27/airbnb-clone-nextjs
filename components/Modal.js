/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint react/prop-types: 0 */

export default ({ close, children }) => (
	<div className='nav-container'>
		<div className='modal-background' onClick={() => close()} />
		<div className='modal'>{children}</div>
		<style jsx global>{`
			.modal-background {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.3);
			}
			.modal {
				position: absolute;
				top: 50%;
				left: 50%;
				width: calc(100vh - 4em);
				max-width: 32em;
				max-height: calc(100vh - 4em);
				overflow: auto;
				transform: translate(-50%, -50%);
				padding: 1em;
				border-radius: 0.2em;
				background: white;
			}
		`}</style>
	</div>
);
