import React from 'react';
import { Link } from "react-router-dom";

import SignupForm from "../Components/SignupForm";
import Card from "../../Shared/UI/Card";
import Modal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import styles from "./Auth.module.css";

import { useHttpClient } from "../../Hooks/useHttpHook";

const Signup = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const saveUserCredentials = async (userData) => {
        try {
            await sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify(userData),
                { 'Content-Type': 'application/json' });
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <Card className={ styles.card }>
            { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            { isLoading && <LoadingSpinner asOverlay /> }
            <div className={ styles.header }>
                <h1>Sign up</h1>
            </div>
            <SignupForm onSigningUp={ saveUserCredentials } />
            <div className={ styles.footer }>
                <p>Already have an account ? <Link to="/authentication/signin">Sign in</Link></p>
            </div>
        </Card>
    );
};

export default Signup;