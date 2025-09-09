// import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './app.module.css';

// import {
	// useRequestGetToDo,
	// useRequestAddToDo,
	// useUpdatingToDo,
	// useDeleteToDo,
// } from './hooks';

import { Main, NotFound, Todo } from './pages';

// import { useDispatch, useSelector } from 'react-redux';
// import {selectToDo} from './selectors';
// import { adToDo} from './actions';

export const App = () => {

	// console.log(allToDo);
	// const addSomeToDo = () => {
	// 	dispatch(adToDo({todo: 'newToDo',
	// 		completed: false,
	// 		userId: 500,
	// 	}));
	// 	console.log(allToDo);
	// }

	// const [isVisible, setIsVisible] = useState(false);
	// const [isCreating, setIsCreating] = useState(false); // fix 
	// const [refreshToDoFlag, setRefreshToDoFlag] = useState(false);
	// const [newToDo, setNewToDo] = useState('');
	// const [isUpdeting, setIsUpdating] = useState(false);
	// const [toDoChange, setToDoChange] = useState('');

	// const { isLoading, setIsLoading, todos } = useRequestGetToDo(refreshToDoFlag);
	// const { isCreating, setIsCreating, requestAddToDo } = useRequestAddToDo(
	// 	setRefreshToDoFlag,
	// 	refreshToDoFlag,
	// );
	// const { updatingToDo } = useUpdatingToDo(setRefreshToDoFlag, refreshToDoFlag);
	// const { deletingToDo } = useDeleteToDo(setRefreshToDoFlag, refreshToDoFlag);

	// const onModal = (event) => {
	// 	if (event.target.id === 'myModal' || event.target.id === 'myModalSpan') {
	// 		setIsVisible(!isVisible);
	// 	} else if (event.target.id === 'myModal2' || event.target.id === 'myModalSpan2') {
	// 		setIsUpdating(!isUpdeting);
	// 	}
	// };

	// const onChangeAddToDo = ({ target }) => {
	// 	setNewToDo(target.value);
	// 	setToDoChange(target.value);
	// 	if (target.value.length >= 10) {
	// 		setIsCreating(true);
	// 	} else {
	// 		setIsCreating(false);
	// 	}
	// };

	return (
		<div className={style.app}>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<Main/>
						}
					/>
					<Route
						path="/todos/:id"
						element={
							<Todo/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};
