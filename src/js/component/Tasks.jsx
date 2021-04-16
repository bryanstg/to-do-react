import React from "react";
import PropTypes from "prop-types";

export function Tasks({ tasks, deleteTask }) {
	return (
		<ul className="todolist__tasks">
			{tasks.map((task, index) => {
				return (
					<li key={index} onClick={() => deleteTask(index)}>
						{task}
						<span className="delete">x</span>
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
