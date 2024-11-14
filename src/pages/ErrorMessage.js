import React from "react";
import { Text } from 'react-native';
import css from '../css/styles.css';

const ErrorMessage = ({ message }) => message ? <Text style={css.labelError}>{message}</Text> : null;

export default ErrorMessage;