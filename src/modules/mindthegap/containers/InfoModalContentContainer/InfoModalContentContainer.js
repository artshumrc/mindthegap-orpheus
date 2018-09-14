import React from 'react';
import { compose } from 'react-apollo';

// component
import InfoModalContent from '../../components/InfoModalContent';

// graphql
import nodeQuery from '../../graphql/queries/nodeQuery';


const InfoModalContentContainer = props => {
	let node = null;


	if (props.nodeQuery && props.nodeQuery.node) {
		node = props.nodeQuery.node;
	}

	if (!node) {
    // TODO: handle loading or no results state
		return null;
	}

	return (
		<InfoModalContent
			{...node}
    />
	);
};

export default compose(
  nodeQuery,
)(InfoModalContentContainer);
