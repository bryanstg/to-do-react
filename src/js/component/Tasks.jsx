import React from "react";
import PropTypes, { bool, string } from "prop-types";

export function Tasks({ tasks, deleteTask, updateUser, user }) {
	return (
		<ul className="todolist__list">
			{tasks.map((task, index) => {
				return (
					<li className="todolist__list--task" key={index}>
						{task.label}
						<span
							className="delete"
							onClick={event => {
								console.log(tasks.length);
								if (tasks.length === 1) {
									updateUser(user);
								} else {
									deleteTask(index);
								}
							}}>
							{"X"}
						</span>
					</li>
				);
			})}
		</ul>
	);
}

Tasks.propTypes = {
	tasks: PropTypes.array,
	deleteTask: PropTypes.func,
	updateUser: PropTypes.func,
	user: PropTypes.object
};
