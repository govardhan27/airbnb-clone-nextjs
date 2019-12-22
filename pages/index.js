import houses from './houses.json';
import House from '../components/House';
import Layout from '../components/Layout';

const content = (
	<div>
		<h2>Places to Stay</h2>
		<div className='houses'>
			{houses.map((house, index) => (
				<House key={index} {...house} />
			))}
		</div>
		<style jsx>
			{`
				.houses {
					display: grid;
					grid-template-columns: 50% 50%;
					grid-template-rows: 300px 300px;
					grid-gap: 40px;
				}
			`}
		</style>
	</div>
);

const Index = () => <Layout content={content} />;

export default Index;

/**
 *  NOTE:
 * Using Next.js we have the ability to use styled-jsx in our components,
 * to add scoped CSS (CSS that is applied only to the component it’s added to, and does not leak outside)
 *
 *
 */
