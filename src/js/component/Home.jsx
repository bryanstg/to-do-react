import React, { useState, useEffect } from "react";
import { ToDoList } from "./ToDoList.jsx";

export function Home() {
	const [user, setUser] = useState({
		user: "",
		ready: false
	});
	const APIuri = "https://assets.breatheco.de/apis/fake/todos/user";

	const createUser = userInput => {
		fetch(`${APIuri}/${userInput}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				if (response.status === 400) {
					console.log("You already have an account created");
				}
			})
			.then(data => {
				setUser({ ...user, ready: true });
			})
			.then(data => {})
			.catch(error => {
				throw new Error(error);
			});
	};

	const updateUser = userName => {
		fetch(`${APIuri}/${userName.user}`, {
			method: "DELETE",
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
				console.log(data);
				createUser(userName.user);
			})
			.catch();
	};

	return (
		<React.Fragment>
			{user.ready ? (
				<div className="intro">
					<ToDoList
						user={user}
						APIuri={APIuri}
						updateUser={updateUser}
						createUser={createUser}
					/>
				</div>
			) : (
				<div className="home-input">
					<input
						className="user-name"
						type="text"
						name="userName"
						/* value={user.user}  PORQUE AL SECUESTRAR EL VALUE, NO PUEDO ESCRIBIR*/
						id="userName"
						placeholder="Ingresa tu nombre de usuario"
						onChange={event => {
							setUser({ ...user, user: `${event.target.value}` });
						}}
						onKeyUp={event => {
							if (event.key === "Enter") {
								createUser(user.user);
							}
						}}
					/>
				</div>
			)}
		</React.Fragment>
	);
}

//ingresar username
//if exist go to todo
//else, create and go to todo
