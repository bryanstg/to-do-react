import React from "react";
import PropTypes from "prop-types";

export function Tasks({ tasks, deleteTask }) {
	return (
		<ul className="todolist__list">
			{tasks.map((task, index) => {
				return (
					<li
						className="todolist__list--task"
						key={index}
						onClick={() => deleteTask(index)}>
						{task}
						<span className="delete">X</span>
					</li>
				);
			})}
		</ul>
	);
}

Tasks.propTypes = {
	tasks: PropTypes.array,
	deleteTask: PropTypes.func
};
