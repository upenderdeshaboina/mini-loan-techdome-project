import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom/cjs/react-router-dom.min';
import './repayment.css'

class RepaymentList extends Component {
    state = {
        repayments: [],
        amount: '',
        errorMessage: '',
        loading: false,
    };

    componentDidMount() {
        this.fetchRepayments();
    }

    fetchRepayments = async () => {
        const token = localStorage.getItem('token');
        try {
            this.setState({ loading: true, errorMessage: '' });
            const response = await axios.get(`https://loan-app-apis.onrender.com/repayments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.setState({ repayments: response.data, loading: false });
        } catch (error) {
            this.setState({ errorMessage: "Failed to fetch repayments. Please try again.", loading: false });
        }
    };

    makeRepayment = async (repaymentId, expectedAmount) => {
        const token = localStorage.getItem('token');
        const { amount } = this.state;

        if (parseFloat(amount) < expectedAmount) {
            this.setState({ errorMessage: "Repayment amount is too low. Please enter the correct amount." });
            return;
        }

        try {
            await axios.post(`https://loan-app-apis.onrender.com/repayments/${repaymentId}`, { amount: parseFloat(amount) }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.setState({ amount: '', errorMessage: '' });
            this.fetchRepayments();
        } catch (error) {
            this.setState({ errorMessage: "Failed to make repayment. Please try again." });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    onClickLogout=()=>{
        const {history}=this.props
        localStorage.removeItem('token')
        history.replace('/')
    }

    render() {
        const { repayments, amount, loading, errorMessage } = this.state;
    
        if(!localStorage.getItem('token')){
            this.props.history.replace('/')
        }
        return (
            <>
                <nav className='navbar'>
                    <div className='heading'>
                        <Link to='/dashboard' className='link'>
                        
                        <h1>TechDome</h1></Link>
                    </div>
                    <ul>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><Link to='/payments'>Payments</Link></li>
                    </ul>
                    <button className='logout' onClick={this.onClickLogout}>Logout</button>
                </nav>
            
            <div className="repayments-container">

                <h3>Repayments</h3>
                {loading ? (
                    <p>Loading repayments...</p>
                ) : (
                    <ul>
                        {repayments.map((repayment) => (
                            <li key={repayment.id}>
                                Amount Due: {repayment.amount}, Due Date: {repayment.due_date}, Status: {repayment.status}
                                {repayment.status === 'PENDING' && (
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Repayment Amount"
                                            name="amount"
                                            value={amount}
                                            onChange={this.handleInputChange}
                                        />
                                        <button onClick={() => this.makeRepayment(repayment.id, repayment.amount)}>
                                            Pay
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
            </>
        );
    }
}

export default RepaymentList;
