import React from "react";
import '../css/styles.css';

const ErrorMessage = ({ message }) => message ? <div className="labelError">{message}</div> : null;

export default ErrorMessage;
