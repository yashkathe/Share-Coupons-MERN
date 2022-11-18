import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Coupons from "./Coupons/Pages/Coupons";
import Users from "./Users/Pages/Users";

import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Coupons />
                </Route>
                <Route path="/users" exact>
                    <Users />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
