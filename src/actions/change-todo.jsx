export const updateDataRequest = (id, newData) => async (dispatch) => {
	dispatch({type: 'UPDATE_DATA_REQUEST'});
	try {
		const response = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newData),
		});
		const updatedData = await response.json();
		dispatch({ type: 'UPDATE_DATA_SUCCESS', payload: updatedData }); 
	} catch (error) {
		dispatch({ type: 'UPDATE_DATA_FAILURE', payload: error.message });
	}
};
