import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tasks } from "./Tasks.jsx";
import { Error } from "./Error.jsx";

export function ToDoList(props) {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState({ label: "", done: "false" });
	const [error, setError] = useState(false);

	function addTask(event) {
		if (task === "") {
			setError(true);
			return;
		}
		if (event.key == "Enter") {
			setTasks([...tasks, task]);
			setTask({ label: "", done: "false" });
			setError(false);
		}
	}
	function deleteTask(id) {
		const newTasks = [];
		tasks.map((task, index) => {
			if (id === index) {
				newTasks.push({ ...task, done: true });
			}
			newTasks.push(task);
		});
		setTasks(newTasks);
	}

	let getTasks = () => {
		fetch(`${props.APIuri}/${props.user}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				let newList = [];
				data.map((listObject, index) => {
					newList.push(listObject);
				});
				return setTasks(newList);
			})
			.catch(error => {
				console.log("Ocurrió un error" + error);
			});
	};

	let sendTask = useEffect(() => {
		fetch(`${props.APIuri}/${props.user}`, {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				getTasks();
			})
			.catch(error => {
				console.log("Ocurrio un error haciendo put " + error);
			});
	}, [tasks]);

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="todolist">
			<h3>{`Hello ${props.user}`}</h3>
			<div className="todolist__box">
				<input
					className="todolist__box--input"
					type="text"
					value={task.label}
					placeholder="Write your task"
					onChange={event => {
						setTask({ ...task, label: `${event.target.value}` });
					}}
					onKeyUp={addTask}
				/>
				{error && (
					<Error
						message="Invalid task, try again"
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

ToDoList.propTypes = {
	APIuri: PropTypes.string,
	user: PropTypes.string
};
