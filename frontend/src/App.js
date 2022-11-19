import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Coupons from "./Coupons/Pages/Coupons";
import Users from "./Users/Pages/Users";

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
                    <Redirect to="/" />
                </Switch>

            </main>
        </Router>
    );
}

export default App;
