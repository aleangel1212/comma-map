import React from 'react';
import Dropzone from 'react-dropzone';

import { Loader } from '../Common';

function renderDropzone({ loading, onDrop, progress }) {
	if (loading) return <Loader progress={progress} />;

	return (
		<Dropzone
			className="dropzone"
			acceptClassName="dropping"
			onDrop={onDrop}
			accept="application/json"
		>
			<span className="icon is-large">
				<i className="fas fa-2x fa-file-download" />
			</span>
			<h4 className="is-size-4">Drop trip file(s) here</h4>
			<h6 className="is-size-6">Click on trips to view in map</h6>
		</Dropzone>
	);
}

const Sidebar = props => {
	function renderTripDetails(trips) {
		if (trips.length === 0)
			return <h5 className="is-size-5 has-text-centered">No trips :(</h5>;

		return trips.map((trip, i) => (
			<a className="box" key={i} onClick={() => props.toggleTrip(i)}>
				<article className="media">
					<div className="media-content">
						<div className="content">
							<strong>Trip #{i}</strong>
							<hr />
							Start Time: {trip.start_time}
							<br />
							End Time: {trip.end_time}
							<br />
							Duration: {trip.duration} min
							<br />
							Samples: {trip.samples}
							<br />
							Max Speed: {trip.maxSpeed} mph
							<br />
							Avg. Speed: {trip.avgSpeed} mph
							<br />
							Min. Speed: {trip.minSpeed} mph
							<br />
							Distance: {trip.distance} miles
						</div>
						<small>{trip.date}</small>
					</div>
					<div
						className="media-right"
						style={trip.active ? { color: trip.color } : null}
					>
						<span className="icon is-small">
							<i className="fas fa-car" />
						</span>
					</div>
				</article>
			</a>
		));
	}

	return (
		<div className="column sidebar-container is-paddingless">
			{renderDropzone(props)}

			<hr />

			<div className="trip-container">
				{renderTripDetails(props.trips)}
			</div>
		</div>
	);
};

export default Sidebar;
