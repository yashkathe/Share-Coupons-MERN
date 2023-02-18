import React, { useState } from 'react';

import styles from './Auth.module.css';

const SignInForm = (props) => {

    const [ emailID, setEmailID ] = useState('');
    const [ password, setPassword ] = useState('');

    const emailChangeHandler = (event) => {
        setEmailID(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            emailID,
            password,
        };

        props.onSigningIn(user);

        setEmailID('');
        setPassword('');
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
                <button type="submit" >LOG IN</button>
            </div>
        </form>
    );
};

export default SignInForm;