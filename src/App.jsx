import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './app.module.css';

import {
	useRequestGetToDo,
	useRequestAddToDo,
	useUpdatingToDo,
	useDeleteToDo,
} from './hooks';

import { Main, NotFound, Todo } from './pages';

export const App = () => {
	const [isVisible, setIsVisible] = useState(false);

	const [refreshToDoFlag, setRefreshToDoFlag] = useState(false);

	const { isLoading, setIsLoading, todos } = useRequestGetToDo(refreshToDoFlag);

	const { isCreating, setIsCreating, requestAddToDo } = useRequestAddToDo(
		setRefreshToDoFlag,
		refreshToDoFlag,
	);
	const [newToDo, setNewToDo] = useState('');

	const { updatingToDo } = useUpdatingToDo(setRefreshToDoFlag, refreshToDoFlag);
	const [isUpdeting, setIsUpdating] = useState(false);
	const [toDoChange, setToDoChange] = useState('');

	const { deletingToDo } = useDeleteToDo(setRefreshToDoFlag, refreshToDoFlag);

	const onModal = (event) => {
		if (event.target.id === 'myModal' || event.target.id === 'myModalSpan') {
			setIsVisible(!isVisible);
		} else if (event.target.id === 'myModal2' || event.target.id === 'myModalSpan2') {
			setIsUpdating(!isUpdeting);
		}
	};

	const onChangeAddToDo = ({ target }) => {
		setNewToDo(target.value);
		setToDoChange(target.value);
		if (target.value.length >= 10) {
			setIsCreating(true);
		} else {
			setIsCreating(false);
		}
	};

	return (
		<div className={style.app}>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<Main
								setRefreshToDoFlag={setRefreshToDoFlag}
								refreshToDoFlag={refreshToDoFlag}
								todos={todos}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setIsVisible={setIsVisible}
								isVisible={isVisible}
								onModal={onModal}
								requestAddToDo={requestAddToDo}
								newToDo={newToDo}
								setNewToDo={setNewToDo}
								setIsCreating={setIsCreating}
								onChangeAddToDo={onChangeAddToDo}
								isCreating={isCreating}
							/>
						}
					/>
					<Route
						path="/todos/:id"
						element={
							<Todo
								setIsLoading={setIsLoading}
								setIsUpdating={setIsUpdating}
								isUpdeting={isUpdeting}
								setToDoChange={setToDoChange}
								deletingToDo={deletingToDo}
								updatingToDo={updatingToDo}
								setIsVisible={setIsVisible}
								setNewToDo={setNewToDo}
								setIsCreating={setIsCreating}
								isLoading={isLoading}
								onModal={onModal}
								onChangeAddToDo={onChangeAddToDo}
								isVisible={isVisible}
								toDoChange={toDoChange}
								isCreating={isCreating}
							/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};
