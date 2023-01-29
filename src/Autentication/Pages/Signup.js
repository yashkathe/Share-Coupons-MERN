import { Link } from "react-router-dom";

import React from 'react';
import Card from "../../Shared/UI/Card";

import styles from "./Auth.module.css";

const Signup = () => {
    return (
        <Card className={ styles.card }>
            <div>
                <h1>Sign up</h1>
            </div>
            <div></div>
            <div>
                <p>Already have an account ? <Link to="/authentication/signin">Sign in</Link></p>
            </div>
        </Card>
    );
};

export default Signup;