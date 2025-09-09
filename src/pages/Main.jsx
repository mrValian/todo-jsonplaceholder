import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../app.module.css';
import { fetchData, addDataToServer } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectToDo } from '../selectors';
import { Modal } from '../component';

export const Main = () => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector(selectToDo);
	const [show, setShow] = useState(false);
	const [input, setInput] = useState('');
	const [disabled, setDisabled] = useState(true);

	const [sortedList, setSortedList] = useState([]);
	const [sortFlag, setSortedFlag] = useState(true);

	useEffect(() => {
		if(sortFlag) {
			dispatch(fetchData());
		}
	}, [dispatch, sortFlag]);

	const sortAlphabet = () => {
		if (sortedList.length === 0) {
			data.sort((a, b) => {
				if (a.todo < b.todo) {
					return -1;
				}
				if (a.todo > b.todo) {
					return 1;
				}
				return 0;
			});

			setSortedList(data);
			setSortedFlag(false);
		} else if (sortedList.length > 0) {
			setSortedList([]);
			setSortedFlag(true);
		}
	};

	const onChangeFilter = ({ target }) => {
		let value = target.value.toLowerCase();
		let filterDataInput = data.filter((elem) => {
			return elem.todo.toLowerCase().includes(value);
		});
		setSortedList(filterDataInput);
		if (target.value.length > 1) {
			setSortedFlag(false);
		} else if (target.value.length <= 0) {
			setSortedFlag(true);
		}
	};

	const getRandomNumberInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


	const onAddNewToDo = (event) => {
		event.preventDefault();
		dispatch(
			addDataToServer({
				todo: input,
				completed: false,
				userId: getRandomNumberInRange(1, 100),
			}),
		);
		setInput('');
		setDisabled(true);
		setShow(false);
	};

	const onChangeAdToDo = ({ target }) => {
		setInput(target.value);
		if (target.value.length >= 10) {
			setDisabled(false);
		} else if (target.value.length < 10) {
			setDisabled(true);
		}
	};

	return (
		<div>
			<h1 className={style.title}>Todo List</h1>
			<p className={style.findTitle}>Найти</p>
			<input type="text" placeholder="Найти To Do" onChange={onChangeFilter} />
			<div>
				{loading ? (
					<div className={style.loader}></div>
				) : (
					(sortedList.length === 0 && sortFlag ? data : sortedList).map(({ id, todo }) => (
						<NavLink
							// onClick={() => {}}
							to={`/todos/${id}`}
							className={style.task}
							key={id}
						>
							<div className={style.taskId}>{id}</div>
							<div className={style.taskDo}>
								{todo.length > 25 ? `${todo.slice(0, 30)}...` : todo}
							</div>
						</NavLink>
					))
				)}
			</div>
			<div>
				<button
					onClick={() => {
						setShow(true);
					}}
				>
					add
				</button>
				<button
					onClick={() => {
						sortAlphabet();
					}}
				>
					sort
				</button>
			</div>

			<Modal setShow={setShow} onChange={onAddNewToDo} onChangeAdToDo={onChangeAdToDo} input={input} disabled={disabled} show={show} btn='add' />
		</div>
	);
};
