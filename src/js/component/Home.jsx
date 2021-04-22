import React, { useState, useEffect } from "react";
import { ToDoList } from "./ToDoList.jsx";

export function Home() {
	const [user, setUser] = useState("bryanstgarcia");
	const APIuri = "https://assets.breatheco.de/apis/fake/todos/user";

	/* let checkUser = useEffect(() => {
		fetch(`${APIuri}/${user}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					console.log(response);
					return response.json();
				}
				if (response.status === 400) {
					console.log("You already have an account created");
				}
			})
			.then(data => console.log(data + "without json"))
			.catch(error => {
				console.log(error);
			});
	}, [user]); */
	return (
		<React.Fragment>
			<ToDoList user={user} APIuri={APIuri} />
		</React.Fragment>
	);
}

//ingresar username
//if exist go to todo
//else, create and go to todo

{
	/* <form>
	<input
		className="userName"
		type="text"
		name="userName"
		value={user}
		id="userName"
		placeholder="Ingresa tu nombre de usuario"
		onKeyUp={event => {
			if (event.key === "Enter") {
				setUser(user);
			}
		}}
	/>
	<button type="submit">Crea tu lista</button>
</form> */
}
