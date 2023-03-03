import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Coupons from "./Coupons/Pages/Coupons";
import Signin from "./Autentication/Pages/Signin";
import Signup from "./Autentication/Pages/Signup";
import AddCoupons from "./Coupons/Pages/AddCoupons";
import Header from "./Shared/Components/Header";

import { AuthContext } from "./Shared/Context/auth-context";

import styles from './App.module.css';

const App = () => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ userId, setUserId ] = useState(false);

    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    let routes;

    if(isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Coupons />
                </Route>
                <Route path="/coupon/new">
                    <AddCoupons />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Coupons />
                </Route>
                <Route path="/authentication/signin" exact>
                    <Signin />
                </Route>
                <Route path="/authentication/signup" exact>
                    <Signup />
                </Route>
                <Redirect to="/authentication/signin" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider value={ { isLoggedIn, userId, login, logout } } >
            <Router>
                <Header />
                <main className={ styles.main }>
                    { routes }
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
