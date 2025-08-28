import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import style from '../app.module.css';

export const Todo = ({
	setIsLoading,
	setIsUpdating,
	isUpdeting,
	setToDoChange,
	deletingToDo,
	updatingToDo,
	setIsVisible,
	setNewToDo,
	setIsCreating,
	isLoading,
	onModal,
	onChangeAddToDo,
	isVisible,
	toDoChange,
	isCreating,
}) => {
	const [showTodo, setShowTodo] = useState(null);
	const [changeId, setChangeId] = useState(null);

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
	}, [params.id, setIsLoading]);

	const { todo: point } = showTodo || {};

	const onClickUpdateToDo = (id) => {
		setIsLoading(true);
		setIsUpdating(!isUpdeting);
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

	const onDeleteToDo = (id) => {
		deletingToDo(id);
		navigate('/');
	};

	const onUpadate = () => {
		updatingToDo(changeId, { todo: toDoChange });
		setIsVisible(!!isVisible);
		setNewToDo('');
		setIsCreating(false);
		setIsUpdating(false);
	};

	return isLoading ? (
		<div className={style.loader}></div>
	) : (
		<div className={style.showTodo}>
			<div className={style.oneTodo}>{point}</div>
			<button
				onClick={() => {
					navigate('/');
				}}
			>
				back
			</button>
			<div>
				<button
					onClick={() => {
						onClickUpdateToDo(params.id);
					}}
				>
					update
				</button>
				<button
					onClick={() => {
						onDeleteToDo(params.id);
					}}
				>
					delete
				</button>
			</div>

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
