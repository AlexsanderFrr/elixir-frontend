import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordField = ({ value, onChangeText, onBlur, error }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);

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
        passwordContainer: {
            position: 'relative',
            width: '100%'
        },
        input: {
            width: '100%',
            padding: '10px 15px',
            paddingLeft: '48px', // Espaço para o ícone
            paddingRight: '40px', // Espaço para o ícone do olho
            borderRadius: '5px',
            border: '1.5px solid #FFB100',
            outline: 'none',
            color: '#333'
        },
        inputError: {
            borderColor: '#eb0909'
        },
        eyeIcon: {
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            color: '#F5B700'
        }
    };

    return (
        <div style={styles.inputContainer}>
            <FaLock style={styles.iconStyle} />
            <div style={styles.passwordContainer}>
                <input
                    type={passwordVisible ? "password" : "text"}
                    style={{
                        ...styles.input,
                        ...(error ? styles.inputError : {})
                    }}
                    placeholder="Senha"
                    onChange={onChangeText}
                    onBlur={onBlur}
                    value={value}
                />
                <button 
                    type="button" 
                    onClick={() => setPasswordVisible(!passwordVisible)} 
                    style={styles.eyeIcon}
                >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    );
};

export default PasswordField;
