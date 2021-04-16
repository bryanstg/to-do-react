import React, { useState } from "react";
import { Tasks } from "./Tasks.jsx";
import { Error } from "./Error.jsx";

export function ToDoList() {
	const [tasks, setTasks] = useState(["Hacer café", "pasear al suegro"]);
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
		<div className="todolist container">
			<div className="row justify-content-center">
				<div className="col-xs-12 col-md-6">
					<input
						className="form-control todolist__input"
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
					<div className="">{`${tasks.length} item left`}</div>
				</div>
			</div>
		</div>
	);
}
