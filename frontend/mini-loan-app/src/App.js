import React from 'react';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Auth/Login';
import Register from './Auth/Register';
import RepaymentList from './Repayment/RepaymentList'
import './App.css'

const App = () => {

    
    return (
        <div className='app-container'>
            <Router>
                <Switch>
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path='/payments' component={RepaymentList}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
