import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './App/App';
import DevTools from './DevTools';

const Root = ({ store, history }) => (
	<MuiThemeProvider>
		<Provider store={store}>
			<div>
				<App />
				<DevTools />
			</div>
		</Provider>
	</MuiThemeProvider>
);

Root.propTypes = {
	store: PropTypes.shape({ /* TODO: update */ }).isRequired,
	history: PropTypes.shape({ /* TODO: update */ }).isRequired,
};

export default Root;
