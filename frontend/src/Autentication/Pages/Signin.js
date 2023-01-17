import { Link } from "react-router-dom";

import React from 'react';
import Card from "../../Shared/UI/Card";

import styles from "./Auth.module.css";

const Signin = () => {
    return (
        <Card className={ styles.card }>
            <div>
                <h1>Sign in</h1>
            </div>
            <div></div>
            <div>
                <p>Dont have an account ? <Link to="/authentication/signup">Sign up</Link></p>
            </div>
        </Card>
    );
};

export default Signin;