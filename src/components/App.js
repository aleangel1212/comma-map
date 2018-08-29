import React, { Component } from 'react';
import randomcolor from 'randomcolor';
import moment from 'moment';

import Sidebar from './Sidebar';
import Map from './Map';

class App extends Component {
	state = {
		loading: false,
		speed: null,
		trips: [],
	};

	usedColors = {};

	clearTrips() {
		this.usedColors = {};
		this.setState({ trips: [], speed: null });
	}

	toggleTrip(index) {
		const newTrips = this.state.trips.map(
			(trip, i) =>
				i === index ? { ...trip, active: !trip.active } : trip,
		);

		this.setState({ trips: newTrips, speed: null });
	}

	setSpeed(speed) {
		this.setState({ speed });
	}

	onDrop(acceptedFiles) {
		const newTripLen = this.state.trips.length + acceptedFiles.length;

		this.setState({ loading: true, speed: null });

		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onload = () => {
				const fileAsBinaryString = reader.result;

				const data = JSON.parse(fileAsBinaryString);

				const start_time = moment(data.start_time);
				const end_time = moment(data.end_time);

				const avgSpeed =
					data.coords.reduce((acc, obj) => acc + obj.speed, 0) /
					data.coords.length;

				let maxSpeed = 0;

				data.coords.forEach(
					t => (maxSpeed = t.speed > maxSpeed ? t.speed : maxSpeed),
				);

				let minSpeed = Number.MAX_SAFE_INTEGER;

				data.coords.forEach(
					t => (minSpeed = t.speed < minSpeed ? t.speed : minSpeed),
				);

				const distance =
					data.coords[data.coords.length - 1].dist -
					data.coords[0].dist;

				const coords = data.coords;

				let color = '#ff0000';

				while (this.usedColors[color])
					color = randomcolor({
						luminosity: 'bright',
						hue: 'random',
					});

				this.usedColors[color] = true;

				const trip = {
					start_time: start_time.format('LT'),
					end_time: end_time.format('LT'),
					date: start_time.format('dddd, MMMM Do YYYY'),
					duration: end_time.diff(start_time, 'minutes'),
					maxSpeed: Math.round(maxSpeed * 100) / 100,
					avgSpeed: Math.round(avgSpeed * 100) / 100,
					minSpeed: Math.round(minSpeed * 100) / 100,
					samples: coords.length,
					distance: Math.round(distance * 100) / 100,
					active: false,
					color,
					coords,
				};

				this.setState({ trips: [...this.state.trips, trip] });
				this.setState({
					loading: this.state.trips.length !== newTripLen,
				});
			};

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');

			reader.readAsBinaryString(file);
		});
	}

	renderClearButton(numTrips) {
		if (numTrips < 1) return null;

		return (
			<a
				className="clear-trips button is-danger"
				onClick={this.clearTrips.bind(this)}
			>
				Clear Trips
			</a>
		);
	}

	renderMarkerSpeed(speed) {
		if (!speed) return null;

		return (
			<div className="card marker-info">
				<div className="card-content">
					<div className="content">
						Speed at Sample: {Math.round(speed * 100) / 100} mph
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="columns is-marginless">
				<Sidebar
					onDrop={this.onDrop.bind(this)}
					trips={this.state.trips}
					loading={this.state.loading}
					toggleTrip={this.toggleTrip.bind(this)}
				/>

				<Map
					clearTrips={this.clearTrips.bind(this)}
					trips={this.state.trips}
					loading={this.state.loading}
					speed={this.state.speed}
					setSpeed={this.setSpeed.bind(this)}
				/>
				{this.renderClearButton(this.state.trips.length)}
				{this.renderMarkerSpeed(this.state.speed)}
			</div>
		);
	}
}

export default App;
