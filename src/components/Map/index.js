import React from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';

import { Loader } from '../Common';

const Map = props => {
	function renderClearButton(numTrips) {
		if (numTrips < 1) return null;

		return (
			<a
				className="clear-trips button is-danger"
				onClick={props.clearTrips}
			>
				Clear Trips
			</a>
		);
	}

	function renderPolylines(trips) {
		return trips.map((trip, i) => (
			<Polyline
				key={i}
				path={trip.coords}
				geodesic={true}
				options={{
					strokeColor: '#ff2527',
					strokeWeight: 2,
				}}
			/>
		));
	}

	const GoogleMapComponent = withGoogleMap(() => (
		<GoogleMap
			defaultCenter={{
				lat: 37.74977073928103,
				lng: -122.39242219446099,
			}}
			defaultZoom={13}
		>
			{renderPolylines(props.trips)}
		</GoogleMap>
	));

	function renderMap(loading) {
		if (loading) return <Loader className="is-fullheight" />;

		return (
			<GoogleMapComponent
				containerElement={
					<div style={{ height: '100%', width: '100%' }} />
				}
				mapElement={<div style={{ height: '100%', width: '100%' }} />}
			/>
		);
	}

	return (
		<div className="map-container column is-paddingless">
			{renderClearButton(props.trips.length)}
			{renderMap(props.loading)}
		</div>
	);
};

export default Map;
