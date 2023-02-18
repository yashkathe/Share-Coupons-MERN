import { Link } from "react-router-dom";

import React from 'react';
import Card from "../../Shared/UI/Card";

import styles from "./Auth.module.css";
import SignInForm from "../Components/SignInForm";

const Signin = () => {

    const logUserIn = (userData) => {
        console.log(userData);
    };

    return (
        <Card className={ styles.card }>
            <div className={styles.header}>
                <h1>Sign in</h1>
            </div>
            <SignInForm onSigningIn={ logUserIn } />
            <div className={styles.footer}>
                <p>Dont have an account ? <Link to="/authentication/signup">Sign up</Link></p>
            </div>
        </Card>
    );
};

export default Signin;