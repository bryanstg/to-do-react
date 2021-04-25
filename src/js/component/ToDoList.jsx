import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tasks } from "./Tasks.jsx";
import { Error } from "./Error.jsx";

export function ToDoList(props) {
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState({ label: "", done: false });
	const [error, setError] = useState(false);

	function deleteTask(id) {
		const newTasks = tasks.filter((task, index) => {
			if (id === index) {
				return false;
			}
			return true;
		});
		fetch(`${props.APIuri}/${props.user.user}`, {
			method: "PUT",
			body: JSON.stringify([...newTasks]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					getTasks();
				}
			})
			.catch(error => console.log(error));
	}

	let getTasks = () => {
		fetch(`${props.APIuri}/${props.user.user}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				setTasks(data);
				setTask({ ...task, label: "" });
			})
			.catch(error => {
				console.log("Ocurrió un error" + error);
			});
	};

	let sendTasks = event => {
		if (task.label != "" && event.key == "Enter") {
			setError(false);
			fetch(`${props.APIuri}/${props.user.user}`, {
				method: "PUT",
				body: JSON.stringify([...tasks, task]),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (response.ok) {
						getTasks();
					} else {
						alert("No se actualizó la tarea");
					}
				})
				.catch(error => {
					console.log("Ocurrio un error haciendo put " + error);
				});
		} else if (task.label === "" && event.key === "Enter") {
			setError(true);
		}
	};

	useEffect(() => getTasks(), [props.user]);

	return (
		<div className="todolist">
			<h3>{`Hello ${props.user.user}`}</h3>
			<div className="todolist__box">
				<input
					className="todolist__box--input"
					type="text"
					value={task.label}
					placeholder="Write your task"
					onChange={event => {
						setTask({ ...task, label: `${event.target.value}` });
					}}
					onKeyUp={sendTasks}
				/>
				{error && (
					<Error
						message="Por favor ingresa una tarea válida."
						errorStyle="alert alert-danger"
					/>
				)}

				<Tasks
					tasks={tasks}
					deleteTask={deleteTask}
					updateUser={props.updateUser}
					user={props.user}
				/>

				<div className="todolist__box--list-size">
					{`${tasks.length} item${tasks.length > 1 ? "'s" : ""} left`}
				</div>
			</div>
		</div>
	);
}

ToDoList.propTypes = {
	APIuri: PropTypes.string,
	user: PropTypes.object,
	createUser: PropTypes.func,
	updateUser: PropTypes.func
};
