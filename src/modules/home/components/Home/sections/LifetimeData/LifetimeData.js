/* eslint-disable */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import * as d3 from 'd3';
import _ from 'underscore';

import './LifetimeData.css';


// from http://bl.ocks.org/mbostock/4349187
// Sample from a normal distribution with mean 0, stddev 1.
const normal = () => {
	let x = 0,
		y = 0,
		rds,
		c;
	do {
		x = Math.random() * 2 - 1;
		y = Math.random() * 2 - 1;
		rds = x * x + y * y;
	} while (rds == 0 || rds > 1);
	c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
	return x * c; // throw away extra sample y * c
};

// taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
const gaussian = (x) => {
	let gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
		mean = 0,
		sigma = 1;

	x = (x - mean) / sigma;
	return gaussianConstant * Math.exp(-0.5 * x * x) / sigma;
};


class LifetimeData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
		};

		this.handleStepHover = this.handleStepHover.bind(this);
	}

	componentDidMount() {
		const data = [];
		const data2 = [];
		const data3 = [];

		// loop to populate data array with
		// probabily - quantile pairs
		for (let i = 0; i < 200; i++) {
			const q = normal(); // calc random draw from normal dist
			const p = gaussian(q); // calc prob of rand draw
			const el = {
				q,
				p,
			};

			const q2 = normal();
			const p2 = gaussian(q2);
			const el2 = {
				q: q2,
				p: (p2 * 0.8) - 0.02,
			};

			const q3 = normal();
			const p3 = gaussian(q3);
			const el3 = {
				q: q3,
				p: (p3 * 0.6) - 0.01,
			};

			data.push(el);
			data2.push(el2);
			data3.push(el3);
		}

		// need to sort for plotting
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
		data.sort((x, y) => x.q - y.q);
		data2.sort((x, y) => x.q - y.q);
		data3.sort((x, y) => x.q - y.q);

		// Set the dimensions of the canvas / graph
		const width = window.innerWidth;
		const height = 600;

		// set the ranges
	 	const x = d3.scaleLinear().range([0, width]);
		const y = d3.scaleLinear().range([height * 0.6, 0]);

		// define the line
		const lineWhite = d3.line()
			.curve(d3.curveNatural)
			.x(d => x(d.q))
			.y(d => y(d.p))
			;

		const linePrimary = d3.line()
			.curve(d3.curveNatural)
			.x(d => x(d.q))
			.y(d => y(d.p))
			;

		const lineAccent = d3.line()
			.curve(d3.curveNatural)
			.x(d => x(d.q))
			.y(d => y(d.p))
			;

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		const svg = d3.select('.lifetimeDataLineGraph').append('svg')
			.attr('width', width)
			.attr('height', height)
		  .append('g');
			/*
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
					*/

	  // Scale the range of the data
	  x.domain(d3.extent(data, d => d.q));
	  y.domain([0, d3.max(data, d => d.p)]);

	  // Add the line paths
	  svg.append('path')
		  .data([data])
		  .attr('class', 'line')
			.attr('stroke', '#ffffff')
			.attr('fill', 'transparent')
			.style('stroke-dasharray', '1, 20')
			.style('stroke-linecap', 'round')
			.style('stroke-width', '1')
		  .attr('d', lineWhite);

	  svg.append('path')
		  .data([data2])
		  .attr('class', 'line')
			.attr('stroke', '#03A9F4')
			.attr('fill', 'transparent')
			.style('stroke-dasharray', '1, 20')
			.style('stroke-linecap', 'round')
			.style('stroke-width', '1')
		  .attr('d', linePrimary);

	  svg.append('path')
		  .data([data3])
		  .attr('class', 'line')
			.attr('stroke', '#666666')
			.attr('fill', 'transparent')
			.style('stroke-dasharray', '1, 20')
			.style('stroke-linecap', 'round')
			.style('stroke-width', '1')
		  .attr('d', lineAccent);
	}

	handleStepHover(newActiveStepIndex) {
		this.setState({
			activeStep: newActiveStepIndex,
		});
	}

	render() {
		const { activeStep } = this.state;

		const lifetimeDataMarkers = [{
			label: 'Entry',
			description: 'Begin by entering your data in a digital form using our sophisticated but simple data entry forms',
		}, {
			label: 'Publishing',
			description: 'Publish as much of your collections as you want and embed item records in a beautifully designed content authoring interface',
		}, {
			label: 'Export',
			description: 'At the end of the collection’s active timespan, export all your item records in an archival data format of your choice',
		}];

		return (
			<div className="lifetimeData">
				<div className="lifetimeDataVisualization">
					<div className="lifetimeDataLineGraph" />
				</div>
				<div className="lifetimeDataText">
					<h2>Plan for the full lifetime of your data</h2>

					<div className="lifetimeDataSteps">
						<Row>
							{lifetimeDataMarkers.map((marker, i) => {
								const active = false;

								return (
									<Col
										lg={4}
										key={marker.label}
									>
										<div
											className={`lifetimeDataStep ${activeStep === i ? 'lifetimeDataStepActive' : ''}`}
											onMouseOver={this.handleStepHover.bind(this, i)}
										>
											<div className="lifetimeDataMarker" />
											<span className="lifetimeDataLabel">
												{marker.label}
											</span>
											<p>
												{marker.description}
											</p>
										</div>
									</Col>
								);
							})}
						</Row>
					</div>
				</div>
			</div>
		);
	}
}

export default LifetimeData;
