import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
	render() {
		// const GoogleMapExample = withGoogleMap(() => (
		// 	<GoogleMap
		// 		defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
		// 		defaultZoom={13}
		// 	/>
		// ));
		return (
			<div
				className="map-container column is-two-thirds"
				style={{
					backgroundImage:
						'url(https://3d.bk.tudelft.nl/ken/img/blog/new-google-maps.png)',
					backgroundSize: 'contain',
				}}
			>
				{
					// <GoogleMapExample
					// 	containerElement={
					// 		<div style={{ height: `500px`, width: '500px' }} />
					// 	}
					// 	mapElement={<div style={{ height: `100%` }} />}
					// />
				}
			</div>
		);
	}
}

export default Map;
