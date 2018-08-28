import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Map from './Map';

class App extends Component {
	state = {
		trips: [],
	};

	onDrop(acceptedFiles) {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onload = () => {
				const fileAsBinaryString = reader.result;

				this.setState({
					trips: [
						...this.state.trips,
						JSON.parse(fileAsBinaryString),
					],
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
				/>
				<Map />
			</div>
		);
	}
}

export default App;
