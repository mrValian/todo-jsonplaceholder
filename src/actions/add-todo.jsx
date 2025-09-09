export const ADD_DATA_PENDING = 'ADD_DATA_PENDING';
export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
export const ADD_DATA_ERROR = 'ADD_DATA_ERROR';

export const addDataToServer = (data) => {
	return async (dispatch) => {
		dispatch({ type: ADD_DATA_PENDING });
		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			dispatch({ type: ADD_DATA_SUCCESS, payload: result });
		} catch (error) {
			dispatch({ type: ADD_DATA_ERROR, payload: error });
		}
	};
};
