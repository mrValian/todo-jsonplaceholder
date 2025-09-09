export const deleteItemSuccess = (id) => async (dispatch) => {
	try {
		await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		});
		dispatch({ type: 'DELETE_DATA_SUCCESS', payload: id }); 
	} catch (error) {
		dispatch({ type: 'DELETE_DATA_ERROR', payload: error.message });
	}
};
