import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
	Chart,
	CategoryScale,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
} from 'chart.js';

Chart.register(LinearScale);
Chart.register(CategoryScale, LineController, LineElement, PointElement);

const RateChart = ({ row }) => {
	const labels = [
		new Date(row.date).toLocaleDateString() + '\n' + new Date(row.date).toLocaleTimeString(),
		...row.history.map(
			item =>
				new Date(item.date).toLocaleDateString() + '\n' + new Date(item.date).toLocaleTimeString()
		),
	];

	const data = [row.rate, ...row.history.map(item => item.currentRate)];

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Rate over Time',
				data,
				fill: false,
				backgroundColor: 'rgb(75, 192, 192)',
				borderColor: 'rgba(255, 140, 0, 0.8)',
				borderWidth: 2,
				pointRadius: 5,
				pointBackgroundColor: 'rgba(255, 140, 0, 0.8)',
			},
		],
	};

	const options = {
		scales: {
			x: { type: 'category' },
			y: { type: 'linear' },
		},
		plugins: {
			legend: {
				labels: {
					color: 'black',
				},
			},
		},
		layout: {
			padding: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10,
			},
		},
	};

	return <Line data={chartData} options={options} />;
};

RateChart.propTypes = {
	row: PropTypes.shape({
		date: PropTypes.string.isRequired,
		rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				date: PropTypes.string.isRequired,
				currentRate: PropTypes.number.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default RateChart;
