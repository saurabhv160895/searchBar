import React from "react";
import "./user.css";
const user = (props) => {
	let foundInItems = false;
	props.data.items.map((item) => {
		if (item.toLowerCase().match(props.searchString)) foundInItems = true;
	});

	let renderUser = Object.keys(props.data).map((el, index) => {
		if (el === "items") {
			if (foundInItems)
				return (
					<p key={index}>
						{"'" + props.searchString + "'" + " found in items"}
					</p>
				);
		} else {
			return <p key={index}>{props.data[el]}</p>;
		}
	});
	let classNameArray = ["user"];

	if (props.cursor === props.index) {
		classNameArray.push("active");
	}
	return <div className={classNameArray.join(" ")}>{renderUser}</div>;
};

export default user;
