import React from 'react';
import PropTypes from 'prop-types';

import DashboardCounts from '../../../mindthegap/components/DashboardCounts';
import DashboardNav from '../../../mindthegap/components/DashboardNav';
import DashboardRecentActivity from '../DashboardRecentActivity';


import './Dashboard.css';



const Dashboard = ({ interviewsCount, eventsCount, itemsCount, peopleCount }) => (
	<div className="dashboard">
		<DashboardNav />
		<DashboardCounts
			interviewsCount={interviewsCount}
			eventsCount={eventsCount}
			itemsCount={itemsCount}
			peopleCount={peopleCount}
		/>
		<DashboardRecentActivity />
	</div>
	);

Dashboard.propTypes = {
	interviewsCount: PropTypes.number,
	eventsCount: PropTypes.number,
	itemsCount: PropTypes.number,
	peopleCount: PropTypes.number,
};

Dashboard.defaultProps = {
	interviewsCount: 0,
	eventsCount: 0,
	itemsCount: 0,
	peopleCount: 0,
};

export default Dashboard;
