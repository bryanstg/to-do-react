import React, { useState, useEffect } from "react";
import { ToDoList } from "../component/ToDoList.jsx";

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
				<div className="home-container">
					<div className="home">
						<div className="home__title">
							<h1>TO DO LIST</h1>
							<p>{`Welcome, please insert a username.`}</p>
							<p>
								{`
									Don't you have a username? Don't worry, insert one and it will be created automatically.
								`}
							</p>
						</div>
						<div className="home__input">
							<input
								className="user-name"
								type="text"
								name="userName"
								id="userName"
								placeholder="Username"
								onChange={event => {
									setUser({
										...user,
										user: `${event.target.value}`
									});
								}}
								onKeyUp={event => {
									if (event.key === "Enter") {
										createUser(user.user);
									}
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}
