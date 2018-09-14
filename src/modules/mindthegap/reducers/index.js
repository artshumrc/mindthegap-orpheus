import * as types from '../actions';

const initialState = {
	modalOpen: false,
	nodeId: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case types.SET_MODAL: {
		return {
			...state,
			modalOpen: action.modalOpen,
			nodeId: action.nodeId,
		};
	}
	default:
		return state;
	}
};
