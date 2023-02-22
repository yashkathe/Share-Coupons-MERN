import React, { useState } from 'react';
import FormLabel from "../../Shared/Components/FormLabel";

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

            <FormLabel label="Email Address" type="email" changeHandler={ emailChangeHandler } value={ emailID } required={ true } />
            <FormLabel label="Password" type="password" changeHandler={ passwordChangeHandler } value={ password } required={ true } min="8" max="12" />

            <div className={ styles.form_element }>
                <button type="submit" >LOG IN</button>
            </div>
        </form>
    );
};

export default SignInForm;