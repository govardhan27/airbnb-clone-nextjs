import Head from 'next/head';

import houses from '../houses.json';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';

const House = ({ house }) => (
	<Layout
		content={
			<div className='container'>
				<Head>
					<title>{house.title}</title>
				</Head>
				<article>
					<img src={house.picture} width='100%' alt='House picture' />
					<p>
						{house.type}-{house.town}
					</p>
					<p>{house.title}</p>
					<p>
						{house.rating} ({house.reviewsCount})
					</p>
				</article>
				<aside>
					<h2>Add dates for prices</h2>
					<DateRangePicker />
				</aside>
				<style jsx>
					{`
						.container {
							display: grid;
							grid-template-columns: 60% 50%;
							grid-gap: 30px;
						}
						aside {
							border: 1px solid #ccc;
							padding: 20px;
						}
					`}
				</style>
			</div>
		}
	/>
);

export default House;

House.getInitialProps = ({ query }) => {
	const { id } = query;
	return {
		house: houses.filter(house => house.id === id)[0]
	};
};
