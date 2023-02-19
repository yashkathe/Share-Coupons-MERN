import React, { useState } from 'react';
import FormLabel from "../../Shared/Components/FormLabel";

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
            <FormLabel label="Email Address" type="email" changeHandler={ emailChangeHandler } value={ emailID } required={ true } />
            <FormLabel label="Password" type="password" changeHandler={ passwordChangeHandler } value={ password } required={ true } min="8" max="12" />
            <FormLabel label="Confirm Password" type="password" changeHandler={ confirmPasswordChangeHandler } value={ confirmPassword } required={ true } min="8" max="12" />
            <div className={ styles.form_element }>
                <button type="submit" >SIGN UP</button>
            </div>
        </form>
    );
};

export default SignupForm;