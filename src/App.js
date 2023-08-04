import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Coupons from "./Coupons/Pages/Coupons";
import Signin from "./Autentication/Pages/Signin";
import Signup from "./Autentication/Pages/Signup";
import AddCoupons from "./Coupons/Pages/AddCoupons";
import UserCoupons from "./Coupons/Pages/UserCoupons";
import UpdateCoupon from "./Coupons/Pages/UpdateCoupon";
import Cart from "./Coupons/Pages/Cart";
import Header from "./Shared/Navigation/Header";

import { AuthContext } from "./Shared/Context/auth-context";

import styles from './App.module.css';

let logoutTimer

const App = () => {

    const [ token, setToken ] = useState(null);
    const [ tokenExpirationTime, setTokenExpirationTime ] = useState();
    const [ userId, setUserId ] = useState(false);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationTime(tokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString()
        }));
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationTime(null)
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if(token && tokenExpirationTime) {
            const remainingTime = tokenExpirationTime.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [ token, logout, tokenExpirationTime ]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if(
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token);
        }
    }, [ login ]);

    let routes;

    if(token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Coupons />
                </Route>
                <Route path="/:userId/coupons" exact>
                    <UserCoupons />
                </Route>
                <Route path="/:userId/cart">
                    <Cart/>
                </Route>
                <Route path="/coupon/new" exact>
                    <AddCoupons />
                </Route>
                <Route path="/coupon/:couponId" exact>
                    <UpdateCoupon />
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
        <AuthContext.Provider
            value={ {
                isLoggedIn: !!token,
                token: token,
                userId,
                login,
                logout
            } } >
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
