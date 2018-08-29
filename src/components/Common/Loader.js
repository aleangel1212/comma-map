import React from 'react';

function renderProgress(progress) {
	if (!progress) return null;

	return (
		<progress className="progress is-success" value={progress} max="100" />
	);
}

const Loader = props => (
	<div className={`loader-container ${props.className}`}>
		<div className="loader" />
		{renderProgress(props.progress)}
	</div>
);

export { Loader };
