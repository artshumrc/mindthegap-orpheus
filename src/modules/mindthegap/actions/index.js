/*
 * action types
 */
export const SET_MODAL = 'SET_MODAL';


/*
 * action creators
 */
export const setModal = ({ modalOpen, nodeId }) => ({
	type: SET_MODAL,
	modalOpen,
	nodeId,
});
