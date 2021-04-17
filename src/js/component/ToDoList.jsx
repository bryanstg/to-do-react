import React, { useState } from "react";
import { Tasks } from "./Tasks.jsx";
import { Error } from "./Error.jsx";

export function ToDoList() {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState("");
	const [error, setError] = useState(false);

	function addTask(event) {
		if (task === "") {
			setError(true);
			return;
		}
		if (event.key == "Enter") {
			setTasks([...tasks, task]);
			setTask("");
			setError(false);
		}
	}
	function deleteTask(id) {
		const newTasks = tasks.filter((task, index) => {
			return index != id;
		});
		setTasks(newTasks);
	}

	return (
		<div className="todolist">
			<div className="todolist__box">
				<input
					className="todolist__box--input"
					type="text"
					value={task}
					placeholder="Write your task"
					onChange={event => setTask(event.target.value)}
					onKeyUp={addTask}
				/>
				{error && (
					<Error
						message="Tarea invalida, debes llenar el campo"
						errorStyle="alert alert-danger"
					/>
				)}
				<Tasks tasks={tasks} deleteTask={deleteTask} />
				<div className="todolist__box--list-size">
					{`${tasks.length} item${tasks.length > 1 ? "'s" : ""} left`}
				</div>
			</div>
		</div>
	);
}
