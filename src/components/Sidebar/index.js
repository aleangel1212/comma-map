import React from 'react';
import Dropzone from 'react-dropzone';

function renderTripDetails(trips) {
	if (trips.length === 0) return null;

	return trips.map((trip, i) => (
		<div className="box" key={i}>
			<h1>Trip #{i}</h1>
		</div>
	));
}

const Sidebar = props => (
	<div className="column sidebar-container is-one-third">
		<Dropzone
			className="dropzone"
			acceptClassName="dropping"
			onDrop={props.onDrop}
			accept="application/json"
		>
			<span className="icon is-large">
				<i className="fas fa-2x fa-file-download" />
			</span>
			<h4 className="is-size-4">Drop trip files here</h4>
		</Dropzone>

		<hr />

		{renderTripDetails(props.trips)}
	</div>
);

export default Sidebar;
