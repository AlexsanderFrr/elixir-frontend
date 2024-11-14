import React from "react";
import { FaEnvelope } from 'react-icons/fa';

const styles = {
    inputContainer: {
        position: 'relative',
        marginBottom: '15px'
    },
    iconStyle: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        color: '#F5B700'
    },
    input: {
        width: '100%',
        padding: '10px 15px',
        paddingLeft: '48px', // Espaço para o ícone
        borderRadius: '5px',
        border: '1.5px solid #FFB100',
        outline: 'none',
        color: '#333'
    },
    inputError: {
        borderColor: '#eb0909'
    },
    placeholder: {
        color: '#B1B1B1'
    }
};

const InputField = ({ icon, placeholder, value, onChangeText, onBlur, error }) => (
    <div style={styles.inputContainer}>
        <FaEnvelope style={styles.iconStyle} />
        <input
            type="text"
            style={{
                ...styles.input,
                ...(error ? styles.inputError : {})
            }}
            placeholder={placeholder}
            onChange={onChangeText}
            onBlur={onBlur}
            value={value}
        />
    </div>
);

export default InputField;
