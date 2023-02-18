import { Link } from "react-router-dom";

import React from 'react';
import Card from "../../Shared/UI/Card";

import styles from "./Auth.module.css";
import SignupForm from "../Components/SignupForm";

const Signup = () => {

    const saveUserCredentials = (userData) => {
        console.log(userData);
    };

    return (
        <Card className={ styles.card }>
            <div className={styles.header}>
                <h1>Sign up</h1>
            </div>
            <SignupForm onSigningUp={ saveUserCredentials } />
            <div className={styles.footer}>
                <p>Already have an account ? <Link to="/authentication/signin">Sign in</Link></p>
            </div>
        </Card>
    );
};

export default Signup;