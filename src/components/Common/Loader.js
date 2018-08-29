import React from 'react';

const Loader = props => (
	<div className={`loader-container ${props.className}`}>
		<div className="loader" />
	</div>
);

export { Loader };
