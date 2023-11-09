import React, { useState, useRef } from 'react';
import {
	ReactPhotoSphereViewer,
	MarkersPlugin,
} from 'react-photo-sphere-viewer';
import './App.css';

const App = () => {
	const pSRef = useRef();
	const [photoViewer, setPhotoViewer] = useState(1);

	const plugins = [
		[
			MarkersPlugin,
			{
				// list of markers
				markers: [
					photoViewer == 1
						? {
								// image marker that opens the panel when clicked
								id: 'image-car',
								position: { yaw: '0.33deg', pitch: '0.1deg' },
								image: 'images/pin.png',
								anchor: 'bottom center',
								size: { width: 32, height: 32 },
								tooltip: '<b>Car</b>',
						  }
						: {},
					photoViewer == 1 && {
						id: 'image-human',
						position: { yaw: '40deg', pitch: '-90deg' },
						image: 'images/pin.png',
						anchor: 'bottom center',
						size: { width: 32, height: 32 },
						tooltip: '<b>Human</b>',
					},
				],
			},
		],
	];

	const handleChangeImage = (type) => {
		let numberImage = photoViewer;
		if (type === 'next') {
			numberImage = numberImage === 5 ? 1 : numberImage + 1;
		} else {
			numberImage = numberImage === 1 ? 5 : numberImage - 1;
		}

		console.log(`images/image${numberImage}.jpg`);

		pSRef.current
			.setPanorama(`images/image${numberImage}.jpg`, {
				showLoader: true,
			})
			.then(() => {
				console.log('update success');
			});

		setPhotoViewer(numberImage);
	};

	return (
		<div className='container-images'>
			<ReactPhotoSphereViewer
				ref={pSRef}
				src={`images/image${photoViewer}.jpg`}
				height={'100vh'}
				width={'100%'}
				plugins={plugins}
			></ReactPhotoSphereViewer>
			<div className='custom-tab-bar'>
				<button onClick={() => handleChangeImage('prev')}>
					<img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTMuMDU5MDUiIGhlaWdodD0iNTAwLjg5NTcxIiB2aWV3Qm94PSIwIDAgNTEzLjA1OTA1IDUwMC44OTU3MSI+CiA8ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj4KICA8ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPgogICA8cG9seWdvbiBwb2ludHM9IjQ2NC4xNzkgMjguMjc4IDQ4NC43NzkgNDkuNzc4IDI3NS41MjkgMjUwLjI3OCA0ODQuNzc5IDQ1MC43ODggNDY0LjE3OSA0NzIuMjc4IDIzMi40OTkgMjUwLjI3OCA0NjQuMTc5IDI4LjI3OCIgc3R5bGU9ImZpbGw6I2UyMzAzODtzdHJva2U6I2UyMzAzODtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6NDBweDsgc3Ryb2tlLW9wYWNpdHk6MTsgZmlsbC1vcGFjaXR5OjEiLz4KICAgPHBvbHlnb24gcG9pbnRzPSIyNjAuNTg4IDI4LjYyMSAyODEuMTg4IDUwLjEyMSA3MS45MzggMjUwLjYyMSAyODEuMTg4IDQ1MS4xMzEgMjYwLjU4OCA0NzIuNjIxIDI4LjkwNyAyNTAuNjIxIDI2MC41ODggMjguNjIxIiBzdHlsZT0iZmlsbDojZTIzMDM4O3N0cm9rZTojZTIzMDM4O3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0MHB4OyBzdHJva2Utb3BhY2l0eToxOyBmaWxsLW9wYWNpdHk6MSIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==' />
				</button>
				<button>
					<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnPz4KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDE2IDE2Ij4KIDxnIGZpbGw9IiNkNjExMzAiIGZpbGwtb3BhY2l0eT0iMSI+CiAgPHBhdGggZmlsbD0iI2Q2MTEzMCIgZmlsbC1vcGFjaXR5PSIxIiBkPSJtIDMgMSBoIDMgYyAwLjU1MDc4MSAwIDEgMC40NDkyMTkgMSAxIHYgMTIgYyAwIDAuNTUwNzgxIC0wLjQ0OTIxOSAxIC0xIDEgaCAtMyBjIC0wLjU1MDc4MSAwIC0xIC0wLjQ0OTIxOSAtMSAtMSB2IC0xMiBjIDAgLTAuNTUwNzgxIDAuNDQ5MjE5IC0xIDEgLTEgeiBtIDAgMCIvPgogIDxwYXRoIGZpbGw9IiNkNjExMzAiIGZpbGwtb3BhY2l0eT0iMSIgZD0ibSAxMCAxIGggMyBjIDAuNTUwNzgxIDAgMSAwLjQ0OTIxOSAxIDEgdiAxMiBjIDAgMC41NTA3ODEgLTAuNDQ5MjE5IDEgLTEgMSBoIC0zIGMgLTAuNTUwNzgxIDAgLTEgLTAuNDQ5MjE5IC0xIC0xIHYgLTEyIGMgMCAtMC41NTA3ODEgMC40NDkyMTkgLTEgMSAtMSB6IG0gMCAwIi8+CiA8L2c+Cjwvc3ZnPgo=' />
				</button>
				<button onClick={() => handleChangeImage('next')}>
					<img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTMuMDU5MDUiIGhlaWdodD0iNTAwLjg5NTcxIiB2aWV3Qm94PSIwIDAgNTEzLjA1OTA1IDUwMC44OTU3MSI+CiA8ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj4KICA8ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPgogICA8cG9seWdvbiBwb2ludHM9IjQ4Ljg4MSA0NzIuNjE3IDI4LjI4MSA0NTEuMTE3IDIzNy41MyAyNTAuNjE3IDI4LjI4MSA1MC4xMDcgNDguODgxIDI4LjYxNyAyODAuNTYxIDI1MC42MTcgNDguODgxIDQ3Mi42MTciIHN0eWxlPSJmaWxsOiNlMjMwMzg7c3Ryb2tlOiNlMjMwMzg7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjQwcHg7IHN0cm9rZS1vcGFjaXR5OjE7IGZpbGwtb3BhY2l0eToxIi8+CiAgIDxwb2x5Z29uIHBvaW50cz0iMjUyLjQ3MiA0NzIuMjc1IDIzMS44NzIgNDUwLjc3NSA0NDEuMTIyIDI1MC4yNzUgMjMxLjg3MiA0OS43NjUgMjUyLjQ3MiAyOC4yNzUgNDg0LjE1MiAyNTAuMjc1IDI1Mi40NzIgNDcyLjI3NSIgc3R5bGU9ImZpbGw6I2UyMzAzODtzdHJva2U6I2UyMzAzODtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6NDBweDsgc3Ryb2tlLW9wYWNpdHk6MTsgZmlsbC1vcGFjaXR5OjEiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=' />
				</button>
			</div>
		</div>
	);
};

export default App;
