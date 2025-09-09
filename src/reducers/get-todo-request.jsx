export const initialState = {
	data: [],
	choose: [],
	loading: false,
	error: null,
};

export const getDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_DATA_REQUEST':
			return { ...state, loading: true, error: null };
		case 'FETCH_DATA_SUCCESS':
			return { ...state, data: action.payload, loading: false };
		case 'FETCH_DATA_FAILURE':
			return { ...state, error: action.error, loading: false };

		case 'ADD_DATA_PENDING':
			return { ...state, loading: true, error: null };
		case 'ADD_DATA_SUCCESS':
			return { ...state, loading: false, data: [...state.data, action.payload] };
		case 'ADD_DATA_ERROR':
			return { ...state, loading: false, error: action.payload };

		case 'UPDATE_DATA_REQUEST':
			return { ...state, loading: true };
		case 'UPDATE_DATA_SUCCESS':
			return { ...state, data: [...state.data, action.payload] };
			// return { ...state, data: action.payload, loading: false };
		case 'UPDATE_DATA_FAILURE':
			return { ...state, error: action.payload, loading: false };

		case 'DELETE_DATA_SUCCESS':
			return { ...state, loading: true, error: null };
		case 'DELETE_DATA_ERROR':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
