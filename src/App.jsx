import { Routes, Route } from 'react-router-dom';
import style from './app.module.css';

import { Main, NotFound, Todo } from './pages';

export const App = () => {
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
