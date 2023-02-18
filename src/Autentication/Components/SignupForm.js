import React, { useState } from 'react';

import styles from './Auth.module.css';

const SignupForm = (props) => {

    const [ emailID, setEmailID ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const emailChangeHandler = (event) => {
        setEmailID(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            emailID,
            password,
            confirmPassword
        };

        props.onSigningUp(user);

        setEmailID('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <form onSubmit={ submitHandler }>
            <div className={ styles.form_element }>
                <label>
                    Email Address
                </label>
                <input type="email" onChange={ emailChangeHandler } value={ emailID } />
            </div>
            <div className={ styles.form_element }>
                <label>
                    Password
                </label>
                <input type="password" minLength="8" maxLength="16" onChange={ passwordChangeHandler } value={ password } />
            </div>
            <div className={ styles.form_element }>
                <label>
                    Confirm Password
                </label>
                <input type="password" minLength="8" maxLength="16" onChange={ confirmPasswordChangeHandler } value={ confirmPassword } />
            </div>
            <div className={ styles.form_element }>
                <button type="submit" >SIGN UP</button>
            </div>
        </form>
    );
};

export default SignupForm;