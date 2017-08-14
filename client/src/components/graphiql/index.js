import React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import './graphiql.css';

import { login } from '../../lib/auth';

function graphQLFetcher(graphQLParams) {
	return fetch(`${process.env.REACT_APP_GRAPHQL_SERVER}/${process.env.REACT_APP_GRAPHQL_URI}`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'authorization': localStorage.getItem('token') ? localStorage.getItem('token') : null,
		},
		body: JSON.stringify(graphQLParams),
	}).then(response => response.json());
}


export default () => 
	<div style={{ height: '100vh'}}>
		<GraphiQL fetcher={graphQLFetcher} />
	</div>;
