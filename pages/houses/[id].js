import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import Head from 'next/head';

import houses from '../houses.json';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate); //clone
	const end = new Date(endDate); //clone
	let dayCount = 0;
	while (end > start) {
		dayCount++;
		start.setDate(start.getDate() + 1);
	}
	return dayCount;
};

const House = ({ house }) => {
	const [dateChosen, setDateChose] = useState(false);
	const [
		numberOfNightsBetweenDates,
		setNumberOfNightsBetweenDates
	] = useState(0);

	const setShowLoginModal = useStoreActions(
		actions => actions.modals.setShowLoginModal
	);

	return (
		<Layout
			content={
				<div className='container'>
					<Head>
						<title>{house.title}</title>
					</Head>
					<article>
						<img
							src={house.picture}
							width='100%'
							alt='House picture'
						/>
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
						<DateRangePicker
							datesChanged={(startDate, endDate) => {
								setDateChose(true);
								setNumberOfNightsBetweenDates(
									calcNumberOfNightsBetweenDates(
										startDate,
										endDate
									)
								);
							}}
						/>
						{dateChosen && (
							<div>
								<h2>Price per night</h2>
								<p>${house.price}</p>
								<h2>Total price for booking</h2>
								<p>
									$
									{(
										house.price * numberOfNightsBetweenDates
									).toFixed(2)}
								</p>
								<button
									className='reserve'
									onClick={() => setShowLoginModal()}
								>
									Reserve
								</button>
							</div>
						)}
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
};

export default House;

House.getInitialProps = ({ query }) => {
	const { id } = query;
	return {
		house: houses.filter(house => house.id === id)[0]
	};
};
