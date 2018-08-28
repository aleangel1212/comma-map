import React, { Component } from 'react';
import moment from 'moment';

import Sidebar from './Sidebar';
import Map from './Map';

class App extends Component {
	state = {
		loading: false,
		trips: [],
	};

	onDrop(acceptedFiles) {
		acceptedFiles.forEach(file => {
			this.setState({ loading: true });
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

				this.setState({
					trips: [...this.state.trips, trip],
					loading: false,
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
				<Map />
			</div>
		);
	}
}

export default App;
