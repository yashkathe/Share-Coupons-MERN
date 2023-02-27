import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";
import SignInForm from "../Components/SignInForm";
import ErrorModal from "../../Shared/UI/ErrorModal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import styles from "./Auth.module.css";

const Signin = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const logUserIn = async (userData) => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Card className={ styles.card }  >
            { error && <ErrorModal errorMessage={ error } onClick={ errorHandler } /> }
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