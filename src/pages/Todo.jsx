import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDataRequest, deleteItemSuccess, fetchData } from '../actions';
import { selectToDo } from '../selectors';

import style from '../app.module.css';
import { Modal } from '../component';

export const Todo = () => {
	const dispatch = useDispatch();
	const [flag, setFlag]= useState(true);

	useEffect(() => {
		if (flag) {
			dispatch(fetchData());
		}
	}, [dispatch, flag]);

	const params = useParams();
	const navigate = useNavigate();

	const { data } = useSelector(selectToDo);

	const [show, setShow] = useState(false);
	const [input, setInput] = useState(data.filter((elem) => elem.id == params.id)[0].todo);
	const [disabled, setDisabled] = useState(true);

	const onDeleteToDo = (id) => {
		dispatch(deleteItemSuccess(id));
		navigate('/');
	};

	const onChange = (event) => {
		event.preventDefault();
		dispatch(
			updateDataRequest(params.id, {
				todo: input,
				completed: false,
				userId: 90,
			}),
		);
		setShow(false);
		setFlag(true);
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
		<div className={style.showTodo}>
			<div className={style.oneTodo}>
				<h2>Выбраное задание:</h2>
				{data.filter((elem) => elem.id == params.id)[0].todo}
			</div>
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
						setShow(true);
						setFlag(false);
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

			<Modal setShow={setShow} onChange={onChange} onChangeAdToDo={onChangeAdToDo} input={input} disabled={disabled} show={show} btn='change' />
		</div>
	);
};
