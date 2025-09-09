import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { getDataReducer} from './reducers';
import { thunk } from "redux-thunk";

const reducer = combineReducers({
    // toDoState: toDoReduser,
    dataReducer: getDataReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,  composeEnhancers(applyMiddleware(thunk)));