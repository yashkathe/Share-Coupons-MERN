import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Coupons from "./Coupons/Pages/Coupons";
import Users from "./Users/Pages/Users";
import Signin from "./Autentication/Pages/Signin";
import Signup from "./Autentication/Pages/Signup";

import styles from './App.module.css';
import Header from "./Shared/Components/Header";

function App() {
    return (
        <Router>
            <Header />
            <main className={styles.main}>
                <Switch>
                    <Route path="/" exact>
                        <Coupons />
                    </Route>
                    <Route path="/users" exact>
                        <Users />
                    </Route>
                    <Route path="/authentication/signin" exact>
                        <Signin />
                    </Route>
                    <Route path="/authentication/signup" exact>
                        <Signup />
                    </Route>
                    <Redirect to="/" />
                </Switch>

            </main>
        </Router>
    );
}

export default App;
