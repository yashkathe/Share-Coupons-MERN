import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";
import SignInForm from "../Components/SignInForm";
import Modal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import { useHttpClient } from "../../Hooks/useHttpHook";
import { AuthContext } from "../../Shared/Context/auth-context";

import styles from "./Auth.module.css";

const Signin = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const logUserIn = async (userData) => {

        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify(userData),
                { 'Content-Type': 'application/json' });
            auth.login(responseData.userId, responseData.token);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Card className={ styles.card }  >
            { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            { isLoading && <LoadingSpinner asOverlay /> }
            <div className={ styles.header }>
                <h1>Sign in</h1>
            </div>
            <SignInForm onSigningIn={ logUserIn } />
            <div className={ styles.footer }>
                <p>Dont have an account ? <Link to="/authentication/signup">Sign up</Link></p>
            </div>
        </Card>
    );
};

export default Signin;