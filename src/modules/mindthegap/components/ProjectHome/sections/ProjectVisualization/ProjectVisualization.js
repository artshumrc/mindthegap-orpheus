import React from 'react'
import createRef from 'create-react-ref/lib/createRef';
import * as d3 from "d3v4"
import * as d3symbolextra from 'd3-symbol-extra'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

// redux
import { setModal } from '../../../../actions';

import './ProjectVisualization.css'


class ProjectVisualization extends React.Component {
	constructor(props){
		super(props);
		this.myRef = createRef();
		autoBind(this);
	}

	componentDidMount() {
		//Todo: figure out how to pass state and set width / height through this correctly
		//const el = this.myRef;
		//this.setState({ width: el.current.parentNode.offsetWidth, height: el.current.parentNode.offsetHeight });

		this.createMTGVis();

		// TODO: implement visualization resize
		//window.addEventListener("resize", this.resizeVisualization);
	}

	createMTGVis() {
		let links;
		let nodes;
		let nodeData;
		let titles;
		let titleText;
		let titleRects;
		let linkData;
		let linksIndex;
		let simulation;

		const rectWidthPad = 10;
		const rectHeightPad = 5;

		let margin = {
			top:50,
			bottom:50,
			right:50,
			left:50
		};

		//Toggle modal based on ID
		const nodeDblClicked = (d) => {
			this.handleNodeDoubleClick(d);
		}

		// TODO: set width and height from window or parentNode
		let width = this.myRef.current.parentNode.clientWidth - margin.left - margin.right;
		let height = this.myRef.current.parentNode.clientHeight - margin.top - margin.bottom;

		//const node = this.myRef.current();
		//const svg = d3.select(this.node);
		//d3.select(this.myRef.current).html(null)
		const svg = d3.select(this.myRef.current);
		svg
		 .attr("width", width + margin.left + margin.right)
		 .attr("height", height + margin.top + margin.bottom);

		const ticked = () => {
			links.attr("d", positionLink);
			nodes.attr("transform", positionNode);
			titles.attr("transform", positionTitle) // bb not created on redraw; breaks if using componentDidUpdate
		}

		const dragstarted = (d) => {
			// if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		const dragged = (d) => {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		const dragended = (d) => {
			// if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		// links are drawn as curved paths between nodes, through the intermediate nodes
		const positionLink = (d) => {
			const offset = 100;
			let source;
			let target;

			nodeData.forEach((node, i) => {
				if (node._id === d.source) {
					source = node;
				}
				if (node._id === d.target) {
					target = node;
				}
			});

			if (!source || !target) {
				return null;
			}

			const midpoint_x = (source.x + target.x) / 2;
			const midpoint_y = (source.y + target.y) / 2;
			const dx = (target.x - source.x);
			const dy = (target.y - source.y);
			const normalise = Math.sqrt((dx * dx) + (dy * dy));
			const offSetX = midpoint_x + offset*(dy/normalise);
			const offSetY = midpoint_y - offset*(dx/normalise);

			return "M" + source.x + "," + source.y + "S" + offSetX + "," + offSetY + " " + target.x + "," + target.y;
		}

		const positionNode = (d) => {
			// keep the node within the boundaries of the svg
			if (d.x < 0) {
				d.x = 0
			};
			if (d.y < 0) {
				d.y = 0
			};
			if (d.x > width) {
				d.x = width
			};
			if (d.y > height) {
				d.y = height
			};
			return "translate(" + d.x + "," + d.y + ")";
		}

		const positionTitle = (d) => {
			if (d.x < 0) {
				d.x = 0
			};
			if (d.y < 0) {
				d.y = 0
			};
			if (d.x > width) {
				d.x = width
			};
			if (d.y > height) {
				d.y = height
			};
			return "translate(" + (d.x - ((d.bb.width + rectWidthPad)/ 2)) + "," + (d.y - ((d.bb.height + rectHeightPad)/ 2)) + ")";
		}

		const isConnected = (a,b) => {
			return linksIndex[a.index + "," + b.index] || linksIndex[b.index + "," + a.index];
		}

		const mouseOver = (d) => {
			nodes.style("fill-opacity", (o) => {
				if (o===d){
					return 1;
				}
				else return isConnected(o,d) ? 1 : 0.1;
			});
			nodes.style("stroke-opacity", (o) => {
				if (o===d){
					return 1;
				}
				else return isConnected(o,d) ? 1 : 0.1;
			});

			// links.style("stroke-opacity", (o) => {
			// 	return o.source === d || o.target === d ? 1 : 0.1;
			// });

			titleText.style("opacity", (o) => {
				if (o===d){
					return 1;
				}
				return isConnected(o,d) ? 1 : 0;
			});
			titleRects.style("opacity", (o) => {
				if (o===d){
					return 1;
				}
				return isConnected(o,d) ? 1 : 0;
			});

			svg.selectAll("g.title").each(function(){
				this.childNodes.forEach((n) => {
					if(n.getAttribute("class") === "titleText"){
						n.parentNode.appendChild(n);
					}
				})
			});
		}

		const mouseOut = () => {
			nodes.style("stroke-opacity", 1);
			nodes.style("fill-opacity", 1);
			links.style("stroke-opacity", 1);
			titleText.style("opacity", 0);
			titleRects.style("opacity", 0);
		}

		//Eventually change to use Graphql query
		d3.json("//mindthegap-api.orphe.us/v1", (error, graph) => {

			if (error) throw error;

			// bind nodes and edges
			nodeData = graph.nodes;
			linkData = graph.edges;

			links = svg.selectAll(".link")
				.data(linkData)
				.enter()
				.append("path")
				.attr("class", "link")
				.style("fill", "none")
				.style('stroke-width', 2);
			nodes = svg.selectAll(".node")
				.data(nodeData)
				.enter().append("g")
				.attr("class", "node");
			titles = svg.selectAll(".title")
				.data(nodeData)
				.enter().append("g")
				.attr("class", "title");

			nodes.append("path")
				.attr("class", "node")
				.attr("class", (d) => {
						//return ("node " + "person");//d.type);
					return(d.type)
				})
				.attr("d", d3.symbol()
					.type(d3symbolextra.symbolHexagon)
					.size((d) => {

						/*
						const scaling = 700;
						if('size' in d){
							return (d.size * scaling)
						} else if (
								d.hasOwnProperty("items")
							|| d.hasOwnProperty("interviews")
							|| d.hasOwnProperty("events")
						){
							let count = 0;
							if (d.hasOwnProperty("items")){count += d.items.length; }
							if (d.hasOwnProperty("interviews")){ count += d.interviews.length; }
							if (d.hasOwnProperty("events")){ count += d.events.length; }

							return count * scaling;
						}
						*/
						//	return scaling > 0 ? scaling : 1;
						if (d.type == "person"){
							return 2000;
						} else if (d.type=="event") {
							return 1000;
						} else {
							return 500;
						}
					})
			 )
			 .on("mouseover", mouseOver)
			 .on("mouseout", mouseOut)
			 .on("dblclick", nodeDblClicked)
			 .call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

			/** Legend **/
			var uniqueTypes = new Set();

			var svgLegend = svg.append("svg")
				.attr("x",50)
				.attr("y", 50)
				.attr("width", 200)
				.attr("height", 400);

			var legendItems = svgLegend.selectAll(".legendItem")
				.data(nodeData.filter(function(d){
					var exists = uniqueTypes.has(d.type);
					uniqueTypes.add(d.type);
					return !exists;
				}))
				.enter().append("g")
				.attr("class", "legendItem")
				.attr("transform", function (d, i) {
					return "translate(30," + (i * 35 + 20) + ")"
				});

				legendItems.append("path")
					.attr("x", 0)
					.attr("y", 0)
					.attr("class", function(d){
						return d.type;
					})
					.attr("d", d3.symbol()
						.type(d3symbolextra.symbolHexagon)
						.size(500));


			legendItems.append("text")
				.attr("x", 20)
				.attr("y", 5)
				.text(function(d){
					return d.type;
				})
				.attr("class", "titleText");

			titleText = titles.append("text")
			.attr("dy", 16)
			.attr("dx", (rectWidthPad/2))
			// .text((d) => { return d.id })
			// Need more robust labeling
			.text((d) => {
				if (d.hasOwnProperty("name")){
					return d.name;
				} else if (d.hasOwnProperty("title")){
					return d.title;
				}
				return "No title or name";
			})
			.attr("class","titleText")
			.style("opacity", 0)
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.on("dblclick", nodeDblClicked);

			titleText.each(function(d){
				d.bb = this.getBBox();
			});

			titleRects = titles.append("rect")
				.attr("width", (d) => {
					return d.bb.width + rectWidthPad;
				})
				.attr("height", (d) => {
					return d.bb.height + rectHeightPad;
				})
			.attr("rx", 5)
			.attr("ry", 5)
			.style("fill", "#4a4a4a")
			.style("stroke", "#ffffff")
			.attr("class", "titleRect")
			.style("opacity", 0)
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.on("dblclick", nodeDblClicked)
			.call(
				d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended)
			);

			linksIndex = {};
			linkData.forEach((d) => {
				let source;
				let target;

				nodeData.forEach((node, i) => {
					if (node._id === d.source) {
						source = i;
					}
					if (node._id === d.target) {
						target = i;
					}
				});

				if (
					typeof source !== 'undefined'
					&& typeof target !== 'undefined'
				) {
					linksIndex[source + "," + target] = true;
					linksIndex[source + "," + source] = true;
					linksIndex[target + "," + target] = true;
				}
			});

			const edgeData = [];
			linkData.forEach(link => {
				let source;
				let target;
				nodeData.forEach((node, i) => {
					if (node._id === link.source) {
						source = i;
					}
					if (node._id === link.target) {
						target = i;
					}
				});

				if (
					typeof source !== 'undefined'
					&& typeof target !== 'undefined'
				) {
					edgeData.push({ source, target });
				}
			});

			simulation = d3.forceSimulation(nodeData)
				// pull nodes together based on the links between them
				.force("link", d3.forceLink(edgeData).strength(0.05))
				// push nodes apart to space them out
				.force("charge", d3.forceManyBody().strength(-50))
				// add some collision detection so they don't overlap
				.force("collide", d3.forceCollide().radius(12))
				// and draw them around the centre of the space
				.force("center", d3.forceCenter(width / 2, height / 2))
				.on('tick', ticked)
				;

		});
	}

	async handleNodeDoubleClick(d) {
		await this.props.handleSetModal({
			modalOpen: true,
			nodeId: d._id,
		});
	}

	render() {
		return (
			<div
				id="graphvis"
				style={{
					height: '100vh',
					width: '100vw',
				}}
			>
				<svg ref={this.myRef} ></svg>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mindTheGap: state.mindTheGap,
});

const mapDispatchToProps = dispatch => ({
	handleSetModal: ({ modalOpen, nodeId }) => {
		dispatch(setModal({ modalOpen, nodeId }));
	},
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProjectVisualization);
