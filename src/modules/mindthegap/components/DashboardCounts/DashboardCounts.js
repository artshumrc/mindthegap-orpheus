import React from 'react';
import { Row, Col } from 'react-bootstrap';

import CountSection from '../CountSection';


import './DashboardCounts.css';


const DashboardCounts = ({ peopleCount, interviewsCount, itemsCount, eventsCount }) => (
	<div className="dashboardCounts">
		<Row>
			<Col md={3}>
				<CountSection
					label="People"
					count={peopleCount}
					link="/people"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Interviews"
					count={interviewsCount}
					link="/interviews"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Events"
					count={eventsCount}
					link="/events"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Items"
					count={itemsCount}
					link="/items"
				/>
			</Col>
		</Row>
	</div>
);

DashboardCounts.defaultProps = {
	peopleCount: 0,
	interviewsCount: 0,
	itemsCount: 0,
	eventsCount: 0,
};

export default DashboardCounts;
