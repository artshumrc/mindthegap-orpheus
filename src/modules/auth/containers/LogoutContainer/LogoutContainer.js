import React from 'react';

import { logoutUser } from '../../../../lib/auth';



const LogoutContainer = props => {

	logoutUser();

	return (
		<div
			style={{
				width: '90%',
				maxWidth: '800px',
				margin: '0 auto',
				padding: '120px 0',
				textAlign: 'center',
			}}
    >
			<p>
        You have successfully logged out.
			</p>
		</div>
	);
};

export default LogoutContainer;
