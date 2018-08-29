import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';

import { Loader } from '../Common';

class Map extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.speed === null;
	}

	renderPolylines(trips) {
		return trips.map((trip, i) => (
			<Polyline
				key={i}
				path={trip.coords}
				geodesic={true}
				options={{
					strokeColor: trip.color,
					strokeWeight: 2,
				}}
			/>
		));
	}

	renderMarkers(trips) {
		const coords = [];

		trips.forEach(trip =>
			trip.coords.forEach((coord, i) => {
				if (i % 100 === 0) coords.push(coord);
			}),
		);

		return coords.map((coord, i) => (
			<Marker
				key={i}
				position={coord}
				onClick={() => this.props.setSpeed(coord.speed)}
			/>
		));
	}

	renderMap(loading) {
		if (loading) return <Loader className="is-fullheight" />;

		const GoogleMapComponent = withGoogleMap(() => (
			<GoogleMap
				defaultCenter={{
					lat: 37.74977073928103,
					lng: -122.39242219446099,
				}}
				defaultZoom={10}
			>
				{this.renderPolylines(
					this.props.trips.filter(trip => trip.active),
				)}
				{this.renderMarkers(
					this.props.trips.filter(trip => trip.active),
				)}
			</GoogleMap>
		));

		return (
			<GoogleMapComponent
				containerElement={
					<div style={{ height: '100%', width: '100%' }} />
				}
				mapElement={<div style={{ height: '100%', width: '100%' }} />}
			/>
		);
	}

	render() {
		return (
			<div className="map-container column is-paddingless">
				{this.renderMap(this.props.loading)}
			</div>
		);
	}
}

export default Map;
