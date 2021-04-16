import React from "react";
import PropTypes from "prop-types";

export function Error({ message, errorStyle }) {
	return <div className={`${errorStyle}`}>{message}</div>;
}

Error.propTypes = {
	message: PropTypes.string,
	errorStyle: PropTypes.string
};
