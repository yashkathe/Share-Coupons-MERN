import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";
import SignInForm from "../Components/SignInForm";

import styles from "./Auth.module.css";

const Signin = () => {

    const logUserIn = (userData) => {
        console.log(userData);
    };

    const [ isFocused, setIsFocused ] = useState(false);

    const focusHandler = () => {
        setIsFocused(true);
        console.log(isFocused);
    };

    const blurHandler = () => {
        setIsFocused(false);
        console.log(isFocused);
    };

    return (
        <Card className={ `${styles.card} ${!isFocused && styles.newCard}` }  >
            <div className={ styles.header }>
                <h1>Sign in</h1>
            </div>
            <SignInForm onSigningIn={ logUserIn } focusHandler={ focusHandler } blurHandler={ blurHandler } />
            <div className={ styles.footer }>
                <p>Dont have an account ? <Link to="/authentication/signup">Sign up</Link></p>
            </div>
        </Card>
    );
};

export default Signin;