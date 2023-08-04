import React, { useState } from 'react';
import FormLabel from "../../Shared/Components/FormLabel";

import { motion } from "framer-motion";

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
            email: emailID,
            password,
        };

        props.onSigningIn(user);

        setEmailID('');
        setPassword('');
    };

    return (
        <div className={ styles.form }>
            <form onSubmit={ submitHandler } >

                <FormLabel name="email" label="Email Address" type="email" changeHandler={ emailChangeHandler } value={ emailID } required={ true } />
                <FormLabel name="password" label="Password" type="password" changeHandler={ passwordChangeHandler } value={ password } required={ true } min="8" max="12" />

                <div className={ styles.form_element }>
                    <motion.button type="submit" className={ styles.login } whileTap={ { scale: 0.9 } }>LOG IN</motion.button>
                </div>
            </form>

        </div>
    );
};

export default SignInForm;