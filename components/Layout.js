import Header from './Header';

const Layout = ({ content }) => (
	<div>
		<Header />
		<main>{content}</main>
		<style jsx global>{`
			body {
				margin: 0;
				font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
					Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
					Helvetica Neue, sans-serif;
				font-size: 14px;
				line-height: 1.5;
				color: #333;
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

export default Layout;
