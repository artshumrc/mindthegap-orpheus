/*
 * Network - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the plot
 * @param _data						-- the dataset
 */

Network = function(_parentElement, _data, _ego=null, _degree=null){
	this.parentElement = _parentElement;
	this.data = _data;
	this.ego = _ego; //If needed to filter to just connections
	this.degree = _degree //How far out to filter

	console.log("initVis() called");
	this.initVis();
}

 /*
 * Initialize visualization (static content; e.g. SVG area, axes)
 */
Network.prototype.initVis = function(){
	var vis = this;

   /** D3 Margin Convention **/
	vis.margin = {
		top: 50, right: 50, bottom: 50, left: 50, rectWidthPad: 10, rectHeightPad: 5
	}
   //vis.width = this.myRef.current.parentNode.clientWidth - vis.margin.left - vis.margin.right;
   //vis.height = this.myRef.current.parentNode.clientHeight - vis.margin.top - vis.margin.bottom;
	vis.width = 1000;
	vis.height = 800;

	vis.svg = d3.select("#" + vis.parentElement).append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
      .append("g")
       .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

   /** Legend **/
	vis.svgLegend = vis.svg.append("svg")
     .attr("x",50)
     .attr("y", 50)
     .attr("width", 200)
     .attr("height", 400);

	console.log("wrangleData() called");
	vis.wrangleData();
}

 /*
  *  Data wrangling
  */
Network.prototype.wrangleData = function(){
	var vis = this;

    // Manipulate / reorganize data into network model
	vis.nodeData = vis.data.nodes;
	vis.edgeData = vis.data.edges;

    // Create index of edges
    // Search by source,target and get boolean
	vis.edgeIndex = {};
	vis.edgeData.forEach((d) => {
		let source, target;
		vis.nodeData.forEach((node, i) => {
			if(node._id == d.source){
				source = i;
			}
			if (node._id === d.target) {
				target = i;
			}
		});
      // Set true if defined
		if(typeof source !== 'undefined' && typeof target !== 'undefined') {
			vis.edgeIndex[source + "," + target] = true;
			vis.edgeIndex[source + "," + source] = true;
			vis.edgeIndex[target + "," + target] = true;
		}
	});
	console.log(vis.edgeIndex);

    // Create array of objects with index, source & target (linked to actual nodes);
	vis.edgeDataObjects = [];
	vis.edgeData.forEach(edge => {
		let source;
		let target;
		vis.nodeData.forEach((node, i) => {
			if (node._id === edge.source) {
				source = i;
			}
			if (node._id === edge.target) {
				target = i;
			}
		});

		if (typeof source !== 'undefined' && typeof target !== 'undefined') {
			vis.edgeDataObjects.push({ source, target });
		}
	});

	if(vis.ego){
      //Filter, using degree
	}

    // vis.isConnected = function(a,b){
    //      return linksIndex[a.index + "," + b.index] || linksIndex[b.index + "," + a.index];
    //  }

    /** Filter data for legend **/
	var uniqueTypes = new Set();
	vis.legendData = vis.nodeData.filter((d) => {
		var exists = uniqueTypes.has(d.type);
		uniqueTypes.add(d.type);
		return !exists;
	})

	console.log(vis);
	console.log("updateVis() called")
	vis.updateVis();
}

/*
 *  The drawing function
 */
Network.prototype.updateVis = function(){
	var vis = this;

  // Network functions
	const nodeDblClicked = (d) => {
		this.handleNodeDoubleClick(d);
	}
	const ticked = () => {
		vis.edges.attr("d", positionEdge);
		vis.nodes.attr("transform", positionNode);
		vis.titles.attr("transform", positionTitle) // bb not created on redraw; breaks if using componentDidUpdate
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

 // edges are drawn as curved paths between nodes, through the intermediate nodes
	const positionEdge = (d) => {
		const offset = 100;
		let source;
		let target;

		vis.nodeData.forEach((node, i) => {
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
		if (d.x > vis.width) {
			d.x = vis.width
		};
		if (d.y > vis.height) {
			d.y = vis.height
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
		if (d.x > vis.width) {
			d.x = vis.width
		};
		if (d.y > vis.height) {
			d.y = vis.height
		};
		return "translate(" + (d.x - ((d.bb.width + vis.margin.rectWidthPad)/ 2)) + "," + (d.y - ((d.bb.height + vis.margin.rectHeightPad)/ 2)) + ")";
	}

	const isConnected = (a,b) => {
		return vis.edgeIndex[a.index + "," + b.index] || vis.edgeIndex[b.index + "," + a.index];
	}

	const mouseOver = (d) => {
     //d is moused node, o is all others
		 // Need to handle mouseover titles better ... collision. Maybe only on node?
		 // Also: set a delay on
		vis.nodes.style("fill-opacity", (o) => {
			if (o===d){
				return 1;
			}
			else return isConnected(o,d) ? 1 : 0.1;
		});
		vis.nodes.style("stroke-opacity", (o) => {
			if (o===d){
				return 1;
			}
			else return isConnected(o,d) ? 1 : 0.1;
		});

		vis.edges.style("stroke-opacity", (o) => {
			return o.source === d._id || o.target === d._id ? 1 : 0.1;
		});

		vis.titleText.style("opacity", (o) => {
			if (o===d){
				return 1;
			} else {
				return isConnected(o,d) ? 1 : 0;
			}

		});
		vis.titleRects.style("opacity", (o) => {
			if (o===d){
				return 1;
			}
			return isConnected(o,d) ? 1 : 0;
		});

		vis.svg.selectAll("g.title").each(function(){
			this.childNodes.forEach((n) => {
				if(n.getAttribute("class") === "titleText"){
					n.parentNode.appendChild(n);
				}
			})
		});
	}

	const mouseOut = () => {
		vis.nodes.style("stroke-opacity", 1);
		vis.nodes.style("fill-opacity", 1);
		vis.edges.style("stroke-opacity", 1);
		vis.titleText.style("opacity", 0);
		vis.titleRects.style("opacity", 0);
	}

 /** Draw nodes and edges **/
 // Bind the edge and node data
	vis.edgeSelection = vis.svg.selectAll(".edge")
    .data(vis.edgeData);
	vis.nodeSelection = vis.svg.selectAll(".node")
    .data(vis.nodeData);
	vis.titleSelection = vis.svg.selectAll(".title")
   .data(vis.nodeData);

 // Merge data, append elements
	vis.edges = vis.edgeSelection.enter().append("path")
		.attr("class", "edge")
      .merge(vis.edgeSelection)
		.style("fill", "none")
		.style('stroke-width', 2);
	vis.nodes = vis.nodeSelection.enter().append("g")
    .attr("class", "node")
    .merge(vis.nodeSelection);
	vis.titles = vis.titleSelection.enter().append("g")
    .attr("class", "title")
    .merge(vis.titleSelection);
	vis.nodes.append("path")
    .attr("class", "node")
    .attr("class", (d) => {
			   //return ("node " + "person");//d.type);
	return(d.type)
})
			.attr("d", d3.symbol()
				.type((d) => {
               if(d.type == "archive"){
                  return d3.symbolHexagonAlt; //Give archives a different shape
               }
               else {
                  return d3.symbolHexagon;
								}
            }) //d3symbolextra in React
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

	vis.titleText = vis.titles.append("text")
			    .attr("dy", 16)
			    .attr("dx", (vis.margin.rectWidthPad/2))
			    .text((d) => {
				   if (d.hasOwnProperty("name")){
					   return d.name;
				   } else if (d.hasOwnProperty("title")){
					   return d.title;
				   } else {
					return "No title or name";
				}
			})
			.attr("class","titleText")
			.style("opacity", 0)
			//.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.on("dblclick", nodeDblClicked);

			// vis.titleText.each((d) => {
         //    console.log("tt");
         //    console.log(d);
         //    console.log(this);
			// 	//d.bb = this.getBBox();
         //    d.bb = d.getBBox();
			// });
	vis.titleText.each(function(d){
		d.bb = this.getBBox();
	})

	vis.titleRects = vis.titles.append("rect")
				.attr("width", (d) => {
					return d.bb.width + vis.margin.rectWidthPad;
				})
				.attr("height", (d) => {
					return d.bb.height + vis.margin.rectHeightPad;
				})
      		.attr("rx", 5)
      		.attr("ry", 5)
      		.style("fill", "#4a4a4a")
      		.style("stroke", "#ffffff")
      		.attr("class", "titleRect")
      		.style("opacity", 0)
      		//.on("mouseover", mouseOver)
      		.on("mouseout", mouseOut)
      		.on("dblclick", nodeDblClicked)
      		.call(
      			d3.drag()
      				.on("start", dragstarted)
      				.on("drag", dragged)
      				.on("end", dragended)
      		);

	console.log(vis.nodes);

      /** Draw legend **/
	vis.legendItems = vis.svgLegend.selectAll(".legendItem")
        .data(vis.legendData)
        .enter().append("g")
        .attr("class", "legendItem")
        .attr("transform", function (d, i) {
	return "translate(30," + (i * 35 + 20) + ")"
});
	vis.legendItems.append("path")
          .attr("x", 0)
          .attr("y", 0)
          .attr("class", function(d){
	return d.type;
})
          .attr("d", d3.symbol()
            .type(d3.symbolHexagon) //d3symbolextra in React
            .size(500));
	vis.legendItems.append("text")
        .attr("x", 20)
        .attr("y", 5)
        .text(function(d){
	return d.type;
})
        .attr("class", "titleText");

      /** Run force simulation **/
	vis.simulation = d3.forceSimulation(vis.nodeData)
         // pull nodes together based on the links between them
         .force("link", d3.forceLink(vis.edgeDataObjects).strength(0.05))
         // push nodes apart to space them out
         .force("charge", d3.forceManyBody().strength(-50))
         // add some collision detection so they don't overlap
         .force("collide", d3.forceCollide().radius(12))
         // and draw them around the centre of the space
         .force("center", d3.forceCenter(vis.width / 2, vis.height / 2))
         .on('tick', ticked);
}
