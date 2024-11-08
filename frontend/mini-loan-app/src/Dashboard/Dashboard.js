import React, { Component } from 'react';
import axios from 'axios';
import LoanList from '../Loan/LoanList'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        user: {},
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.fetchUserDetails(token);
        }
    }

    fetchUserDetails = async (token) => {
        try {
            const response = await axios.get('https://loan-app-apis.onrender.com/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.setState({ user: response.data }, this.fetchLoans);
        } catch (error) {
            console.error("Error fetching user details:", error);
            this.setState({ errorMessage: "Failed to fetch user details" });
        }
    };

    onClickLogout=()=>{
        const {history}=this.props
        localStorage.removeItem('token')
        return history.replace('/')
    }

    
    render() {
        const {  user, } = this.state;

        if (!user || !user.role) {
            return <p>Loading...</p>;
        }
        console.log(this.props)

        return (
            <>
            <nav className='navbar'>
                    <div className='heading'>
                        <h1>{user.username}</h1>
                    </div>
                    <ul>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><Link to='/payments'>Payments</Link></li>
                    </ul>
                    <button className='logout' onClick={this.onClickLogout}>Logout</button>
                </nav>
            <div className='main-container'>
                
                <h2>Dashboard</h2>
                

                <LoanList user={user}/>
            </div>
            </>
        );
    }
}

export default Dashboard;
