import React from 'react';
import Dropzone from 'react-dropzone';

import { Loader } from '../Common';

function renderTripDetails(trips) {
	if (trips.length === 0)
		return <h5 className="is-size-5 has-text-centered">No trips :(</h5>;

	return trips.map((trip, i) => (
		<div className="box" key={i}>
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
						Avg. Speed: {trip.avgSpeed}
						<br />
						Distance: {trip.distance}
					</div>
					<small>{trip.date}</small>
				</div>
				<div className="media-right">
					<span className="icon is-small">
						<i className="fas fa-car" />
					</span>
				</div>
			</article>
		</div>
	));
}

function renderDropzone({ loading, onDrop }) {
	if (loading) return <Loader />;

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
		</Dropzone>
	);
}

const Sidebar = props => (
	<div className="column sidebar-container is-paddingless">
		{renderDropzone(props)}

		<hr />

		<div className="trip-container">{renderTripDetails(props.trips)}</div>
	</div>
);

export default Sidebar;
