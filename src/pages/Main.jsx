import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../app.module.css';

export const Main = ({setRefreshToDoFlag, refreshToDoFlag, todos, isLoading, setIsLoading, setIsVisible, isVisible, onModal, requestAddToDo, newToDo, setNewToDo, setIsCreating, onChangeAddToDo, isCreating}) => {
    const [sortFlag, setSortFlag] = useState(true);
    const [sortedList, setSortedList] = useState([]);

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

    const onBlurFilter = ({ target }) => {
		let value = target.value.toLowerCase();
		let filterDataInput = todos.filter((elem) => {
			return elem.todo.toLowerCase().includes(value);
		});
		setSortedList(filterDataInput);
		setSortFlag(false);
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

	return (
		<div>
			<h1 className={style.title}>Todo List</h1>
			<p className={style.findTitle}>Найти</p>
			<input type="text" placeholder="Найти To Do" onBlur={onBlurFilter} />
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

		</div>
	);
};
