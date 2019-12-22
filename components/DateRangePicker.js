import { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const parseDate = (str, format, locale) => {
	const parsed = dateFnsParse(str, format, new Date(), { locale });
	return DateUtils.isDate(parsed) ? parsed : null;
};

const formatDate = (date, format, locale) =>
	dateFnsFormat(date, format, { locale });

const format = 'dd MMM yyyy';

const today = new Date();
const tommorrow = new Date(today);
tommorrow.setDate(tommorrow.getDate() + 1);

const numberOfNightsBetweenDates = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	console.log('start ', start);
	console.log('end ', end);
	let dayCount = 0;
	while (end > start) {
		end.setDate(end.getDate() + 1);
		dayCount++;
	}
	return dayCount;
};

export default () => {
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState(tommorrow);

	return (
		<div className='date-range-picker-container'>
			<div>
				<label>From: </label>
				<DayPickerInput
					formatDate={formatDate}
					format={format}
					value={startDate}
					parseDate={parseDate}
					placeholder={`${dateFnsFormat(new Date(), format)}`}
					dayPickerProps={{
						modifiers: {
							disabled: {
								before: new Date()
							}
						}
					}}
					onDayChange={day => {
						setStartDate(day);
						if (numberOfNightsBetweenDates(day, endDate) < 1) {
							const newEndDate = new Date(day);
							newEndDate.setDate(newEndDate.getDate() + 1);
							setEndDate(newEndDate);
						}
					}}
				/>
			</div>
			<div>
				<label>To:</label>
				<DayPickerInput
					formatDate={formatDate}
					format={format}
					value={endDate}
					parseDate={parseDate}
					placeholder={`${dateFnsFormat(new Date(), format)}`}
					dayPickerProps={{
						modifiers: {
							disabled: [
								startDate,
								{
									before: new Date()
								}
							]
						}
					}}
					onDayChange={day => setEndDate(day)}
				/>
			</div>
			<style jsx>{`
				.date-range-picker-container div {
					display: grid;
					border: 1px solid #ddd;
					grid-template-columns: 30% 70%;
					padding: 10px;
				}
				label {
					padding-top: 10px;
				}
			`}</style>
			<style jsx global>{`
				.DayPickerInput input {
					padding: 10px;
					width: 120px;
					font-size: 16px;
				}
			`}</style>
		</div>
	);
};

/**
 *  Next.js can’t just import CSS like that. We need to first tell it how to handle CSS files.
 *  We do so by installing @zeit/next-css
 *
 *
 */
