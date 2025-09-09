import axios from 'axios';

export const fetchData = () => {
	return async (dispatch) => {
		dispatch({ type: 'FETCH_DATA_REQUEST' });

		try {
			const response = await axios.get('http://localhost:3000/todos');
			dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
		} catch (error) {
			dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
		}
	};
};
