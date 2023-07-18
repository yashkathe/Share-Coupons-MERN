import React from 'react';
import { Link, useHistory } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import SignupForm from "../Components/SignupForm";
import Card from "../../Shared/UI/Card";
import Modal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import styles from "./Auth.module.css";

import { useHttpClient } from "../../Hooks/useHttpHook";

const Signup = () => {

    const history = useHistory();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const saveUserCredentials = async (userData) => {
        try {
            await sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                userData);
            history.push('/authentication/signin');
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={ styles.header }>
                <h1>Sign up</h1>
            </div>

            <Card className={ styles.card }>
                <AnimatePresence>
                    { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
                </AnimatePresence>
                { isLoading && <LoadingSpinner asOverlay /> }
                <SignupForm onSigningUp={ saveUserCredentials } />
            </Card>

            <div className={ styles.footer }>
                <p>Already have an account ? <Link to="/authentication/signin">Sign in</Link></p>
            </div>
        </>
    );
};

export default Signup;