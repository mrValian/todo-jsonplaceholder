import { useEffect, useState } from 'react';
import {
	Routes,
	Route,
	NavLink,
	useParams,
	useNavigate,
} from 'react-router-dom';
import style from './app.module.css';

import {
	useRequestGetToDo,
	useRequestAddToDo,
	useUpdatingToDo,
	useDeleteToDo,
} from './hooks';

export const App = () => {
	const [showFlag, setShowFlag] = useState(false);

	const [isVisible, setIsVisible] = useState(false);

	const [refreshToDoFlag, setRefreshToDoFlag] = useState(false);

	const { isLoading, setIsLoading, todos } = useRequestGetToDo(refreshToDoFlag);
	const [sortedList, setSortedList] = useState([]);

	const { isCreating, setIsCreating, requestAddToDo } = useRequestAddToDo(
		setRefreshToDoFlag,
		refreshToDoFlag,
	);
	const [newToDo, setNewToDo] = useState('');

	const { updatingToDo } = useUpdatingToDo(setRefreshToDoFlag, refreshToDoFlag);
	const [isUpdeting, setIsUpdating] = useState(false);
	const [toDoChange, setToDoChange] = useState('');
	const [changeId, setChangeId] = useState(null);

	const { deletingToDo } = useDeleteToDo(setRefreshToDoFlag, refreshToDoFlag);

	const [sortFlag, setSortFlag] = useState(true);

	const onModal = (event) => {
		if (event.target.id === 'myModal' || event.target.id === 'myModalSpan') {
			setIsVisible(!isVisible);
		} else if (event.target.id === 'myModal2' || event.target.id === 'myModalSpan2') {
			setIsUpdating(!isUpdeting);
		}
	};

	const getRandomNumberInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const onAddNewToDo = (event) => {
		event.preventDefault();
		requestAddToDo({
			todo: newToDo,
			completed: false,
			userId: getRandomNumberInRange(1, 100),
		});
		setIsVisible(!isVisible);
		setNewToDo('');
		setIsCreating(false);
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

	const onClickUpdateToDo = ({ target }) => {
		setIsLoading(true);
		setIsUpdating(!isUpdeting);
		let id = target.dataset.id;
		setChangeId(id);
		fetch(`http://localhost:3000/todos/${id}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setToDoChange(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onUpadate = () => {
		updatingToDo(changeId, { todo: toDoChange });
		setIsVisible(!!isVisible);
		setNewToDo('');
		setIsCreating(false);
		setIsUpdating(false);
	};

	const onDeleteToDo = ({ target }) => {
		let id = target.dataset.id;
		deletingToDo(id);
	};

	const sortAlphabet = () => {
		if (sortedList.length === 0) {
			todos.sort((a, b) => {
				if (a.todo < b.todo) {
					return -1;
				}
				if (a.todo > b.todo) {
					return 1;
				}
				return 0;
			});

			setSortedList(todos);
			setSortFlag(true);
		} else {
			setSortedList([]);
			setRefreshToDoFlag(!refreshToDoFlag);
			setSortFlag(true);
		}
	};

	const onChangeFilter = ({ target }) => {
		let value = target.value.toLowerCase();
		let filterDataInput = todos.filter((elem) => {
			return elem.todo.toLowerCase().includes(value);
		});
		setSortedList(filterDataInput);
		setSortFlag(false);
	};

	const Todo = () => {
		const [showTodo, setShowTodo] = useState(null);

		const params = useParams();
		const navigate = useNavigate();
		useEffect(() => {
			fetch(`http://localhost:3000/todos/${params.id}`)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setShowTodo(data);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, [params.id]);

		const { todo: point } = showTodo || {};

		return isLoading ? (
			<div className={style.loader}></div>
		) : (
			<div className={style.showTodo}>
				<div className={style.oneTodo}>{point}</div>
				<button
					onClick={() => {
						setShowFlag(false);
						navigate('/');
					}}
				>
					back
				</button>
				<div>
					<button data-id={params.id} onClick={onClickUpdateToDo}>
						update
					</button>
					<button data-id={params.id} onClick={onDeleteToDo}>
						delete
					</button>
				</div>
			</div>
		);
	};

	const Main = () => (
		<div className={showFlag ? style.hide : style.show}>
			<h1 className={style.title}>Todo List</h1>
			<p className={style.findTitle}>Найти</p>
			<input type="text" placeholder="Найти To Do" onChange={onChangeFilter} />
			{isLoading ? (
				<div className={style.loader}></div>
			) : (
				(sortedList.length === 0 && sortFlag ? todos : sortedList).map(
					({ id, todo }) => (
						<NavLink
							onClick={() => {
								setIsLoading(true);
							}}
							to={`/todos/${id}`}
							className={style.task}
							key={id}
						>
							<div className={style.taskId}>{id}</div>
							<div className={style.taskDo}>
								{todo.length > 25 ? `${todo.slice(0, 30)}...` : todo}
							</div>
						</NavLink>
					),
				)
			)}
			{!isLoading && (
				<>
					<button
						onClick={() => {
							setIsVisible(!isVisible);
						}}
					>
						add
					</button>
					<button onClick={sortAlphabet}>sort</button>
				</>
			)}
		</div>
	);

	const NotFound = () => <div>404</div>;

	return (
		<div className={style.app}>
			<div>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/todos/:id" element={<Todo />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>

			{isVisible && (
				<div onClick={onModal} id="myModal" className={style.modal}>
					<div className={style['modal-content']}>
						<span id="myModalSpan" className={style.close}>
							&times;
						</span>
						<div className={style.wrapAddFormToDo}>
							<form
								action="#"
								className={style.addFormToDo}
								onSubmit={onAddNewToDo}
							>
								<label htmlFor="todo">Добавить To Do</label>
								<input
									onChange={onChangeAddToDo}
									id="todo"
									type="text"
									value={newToDo}
									placeholder="Напичатайте что бы вы хотели сделать..."
								/>
								<p className={style.addFormToDoInfo}>
									To Do должен содержать минимум 10 символов
								</p>
								<button disabled={!isCreating}>add</button>
							</form>
						</div>
					</div>
				</div>
			)}

			{isUpdeting &&
				(isLoading ? (
					<div className={style.loader}></div>
				) : (
					<div onClick={onModal} id="myModal2" className={style.modal}>
						<div className={style['modal-content']}>
							<span id="myModalSpan2" className={style.close}>
								&times;
							</span>
							<div className={style.wrapAddFormToDo}>
								<form
									action="#"
									className={style.addFormToDo}
									onSubmit={onUpadate}
								>
									<label htmlFor="todo">Добавить To Do</label>
									<input
										onChange={onChangeAddToDo}
										id="todo"
										type="text"
										value={toDoChange.todo}
										placeholder="Напичатайте что бы вы хотели сделать..."
									/>
									<p className={style.addFormToDoInfo}>
										To Do должен содержать минимум 10 символов
									</p>
									<button disabled={!isCreating}>update</button>
								</form>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};
