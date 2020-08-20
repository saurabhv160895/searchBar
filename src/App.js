import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import User from "./user";

class App extends Component {
	state = {
		userData: [
			{
				id: "123-s2-546",
				name: "John Jacobs",
				items: ["bucket", "bottle"],
				address: "1st Cross, 9th Main, abc Apartment",
				pincode: "5xx012",
			},
			{
				id: "123-s3-146",
				name: "David Mire",
				items: ["Bedroom Set"],
				address: "2nd Cross, BTI Apartment",
				pincode: "4xx012",
			},
			{
				id: "223-a1-234",
				name: "Soloman Marshall",
				items: ["bottle"],
				address: "Riverbed Apartment",
				pincode: "4xx032",
			},
			{
				id: "121-s2-111",
				name: "Ricky Beno",
				items: ["Mobile Set"],
				address: "Sunshine City",
				pincode: "5xx072",
			},
			{
				id: "123-p2-246",
				name: "Sikander Singh",
				items: ["Air Conditioner"],
				address: "Riverbed Apartment",
				pincode: "4xx032",
			},
			{
				id: "b23-s2-321",
				name: "Ross Wheeler",
				items: ["Mobile"],
				address: "1st Cross, 9th Main, abc Apartement",
				pincode: "5xx012",
			},
			{
				id: "113-n2-563",
				name: "Ben Bish",
				items: ["Kitchen Set", "Chair"],
				address: "Sunshine City",
				pincode: "5xx072",
			},
			{
				id: "323-s2-112",
				name: "John Michael",
				items: ["Refrigerator"],
				address: "1st Cross, 9th Main, abc Apartement",
				pincode: "5xx012",
			},
			{
				id: "abc-34-122",
				name: "Jason Jordan",
				items: ["Mobile"],
				address: "Riverbed Apartment",
				pincode: "4xx032",
			},
		],

		searchString: "",
		cursor: 0,
		ref: React.createRef(),
		resultLength: 0,
	};

	componentDidMount() {
		if (this.state.searchString.length !== 0) {
			this.state.ref.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}

	handleKeyDown = (e) => {
		const cursor = this.state.cursor;
		// arrow up/down button should select next/previous list element
		if (e.keyCode === 38 && cursor > 0) {
			const active = document.activeElement;
			if (active.previousSibling) {
				active.previousSibling.focus();
			}
			this.setState((prevState) => ({
				cursor: prevState.cursor - 1,
			}));
		} else if (e.keyCode === 40) {
			const active = document.activeElement;
			if (active.nextSibling) {
				active.nextSibling.focus();
			}
			this.setState((prevState) => ({
				cursor: prevState.cursor + 1,
			}));
		}
	};

	inputHandler = (event) => {
		this.setState({
			searchString: event.target.value,
		});
	};

	render() {
		//console.log(this.state);
		let renderUsers = null;
		let filteredUsers = null;
		if (this.state.searchString.length) {
			let newUserData = [...this.state.userData];
			filteredUsers = newUserData.filter((user, index) => {
				return (
					Object.keys(user).filter((el) => {
						if (el === "items") {
							let arr = user[el].filter((item) => {
								return item.toLowerCase().match(this.state.searchString);
							});

							return arr.length !== 0;
						}
						//	console.log("user[el]", user[el]);
						return user[el].toLowerCase().match(this.state.searchString);
					}).length !== 0
				);
			});

			//console.log("f", filteredUsers);
			if (filteredUsers.length === 0) {
				renderUsers = (
					<div className="no-items">
						<span>No items found</span>
					</div>
				);
			} else {
				renderUsers = filteredUsers.map((el, index) => {
					return (
						<div key={index}>
							<User
								searchString={this.state.searchString}
								data={el}
								index={index}
								cursor={this.state.cursor}
							/>
						</div>
					);
				});
			}
		}

		console.log("cursor", this.state.cursor);

		return (
			<div className="App">
				<input
					style={{ width: "385px" }}
					onChange={this.inputHandler}
					value={this.state.searchString}
					onKeyDown={this.handleKeyDown}
				></input>
				<div className="userList">
					<div ref={this.state.ref} className="inner">
						{renderUsers}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
