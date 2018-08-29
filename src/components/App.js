import React, { Component } from 'react';
import moment from 'moment';

import Sidebar from './Sidebar';
import Map from './Map';

class App extends Component {
	state = {
		loading: false,
		trips: [],
	};

	clearTrips() {
		this.setState({ trips: [] });
	}

	onDrop(acceptedFiles) {
		const newTripLen = this.state.trips.length + acceptedFiles.length;

		this.setState({ loading: true });

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

				const distance =
					data.coords[data.coords.length - 1].dist -
					data.coords[0].dist;

				const coords = data.coords;

				const trip = {
					start_time: start_time.format('HH:MM a'),
					end_time: end_time.format('HH:MM a'),
					date: start_time.format('dddd, MMMM Do YYYY'),
					duration: end_time.diff(start_time, 'minutes'),
					avgSpeed: Math.round(avgSpeed * 100) / 100,
					samples: coords.length,
					distance: Math.round(distance * 100) / 100,
					active: false,
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

	render() {
		return (
			<div className="columns is-marginless">
				<Sidebar
					onDrop={this.onDrop.bind(this)}
					trips={this.state.trips}
					loading={this.state.loading}
				/>

				<Map
					clearTrips={this.clearTrips.bind(this)}
					trips={this.state.trips}
					loading={this.state.loading}
				/>
			</div>
		);
	}
}

export default App;
