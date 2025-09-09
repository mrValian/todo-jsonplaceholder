import style from '../app.module.css';

export const Modal = ({setShow, onChange, onChangeAdToDo, input, disabled, show, btn}) => {
	return (
		<div className={show ? style.modal : style.hide}>
			<div className={style['modal-content']}>
				<span
					className={style.close}
					onClick={() => {
						setShow(false);
					}}
				>
					&times;
				</span>
				<p>Задание должно содержать 10 и более символов...</p>
				<form action="" onSubmit={onChange}>
					<input
						placeholder="Напишите что хотите сделать"
						onChange={onChangeAdToDo}
						type="text"
						value={input}
					/>
					<button disabled={disabled} type="submit">
						{btn}
					</button>
				</form>
			</div>
		</div>
	);
};
