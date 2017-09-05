import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';


const networkInterface = createNetworkInterface({
	uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/${process.env.REACT_APP_GRAPHQL_URI}`,
	// opts: {
	// 	credentials: 'include',
	// }
});

networkInterface.use([{
	applyMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {}; // Create the header object if needed.
		}
		req.options.headers.authorization = localStorage.getItem('token') ? localStorage.getItem('token') : null;
		next();
	}
}]);

const connectionParams = () => ({ authToken: localStorage.getItem('token') ? localStorage.getItem('token') : null });

// const wsClient = new SubscriptionClient(`${process.env.REACT_APP_WS_SERVER}/${process.env.REACT_APP_WS_SERVER_URI}`, {
// 	reconnect: true,
// 	connectionParams,
// });

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
// 	networkInterface,
// 	wsClient
// );

const client = new ApolloClient({
	networkInterface
});

export default client;
// export { wsClient };
