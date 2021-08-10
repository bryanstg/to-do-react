import React from "react";
import PropTypes, { bool, string } from "prop-types";

export function Tasks({ tasks, deleteTask, updateUser, user }) {
	return (
		<div className="todolist__list-box">
			<ul className="todolist__list">
				{tasks.map((task, index) => {
					return (
						<li className="todolist__list--task" key={index}>
							<div className="list--task">{task.label}</div>
							<div className="list--action">
								<span
									className="check"
									onClick={event => {
										console.log(tasks.length);
										if (tasks.length === 1) {
											updateUser(user);
										} else {
											deleteTask(index);
										}
									}}>
									<i className="far fa-check-square"></i>
								</span>
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
									<i className="far fa-trash-alt"></i>
								</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

Tasks.propTypes = {
	tasks: PropTypes.array,
	deleteTask: PropTypes.func,
	updateUser: PropTypes.func,
	user: PropTypes.object
};
