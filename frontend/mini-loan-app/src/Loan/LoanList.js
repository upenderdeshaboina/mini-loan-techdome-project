import React, { Component } from 'react';
import axios from 'axios';
import './loan.css'

class Loans extends Component {
    state = {
        loans: [],
        amount: '',
        term: 'small',
        errorMessage: '',
        loading: false,
        
    };

    componentDidMount() {
        this.fetchLoans();
    }

    fetchLoans = async () => {
        const token = localStorage.getItem('token');
        const endpoint = this.props.user.role === 'admin' ? '/loans/all' : '/loans';
        try {
            this.setState({ loading: true });
            const response = await axios.get(`https://loan-app-apis.onrender.com${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.setState({ loans: response.data, loading: false });
        } catch (error) {
            this.setState({ errorMessage: "Failed to fetch loans", loading: false });
        }
    };

    createLoan = async () => {
        const { amount, term } = this.state;
        const token = localStorage.getItem('token');
        try {
            await axios.post('https://loan-app-apis.onrender.com/loans', { amount, term }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.fetchLoans();
        } catch (error) {
            this.setState({ errorMessage: "Failed to create loan" });
        }
    };

    handleApprove = async (loanId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`https://loan-app-apis.onrender.com/loans/${loanId}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.fetchLoans();
        } catch (error) {
            this.setState({ errorMessage: "Failed to approve loan" });
        }
    };

    handleReject = async (loanId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`https://loan-app-apis.onrender.com/loans/${loanId}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.fetchLoans();
        } catch (error) {
            this.setState({ errorMessage: "Failed to reject loan" });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { loans, amount, term, loading, errorMessage } = this.state;
        const { user } = this.props;

        return (
            <div className="loans-container">
                {user.role === 'consumer' && (
                    <div>
                        <h3>Create Loan</h3>
                        <input
                            type="number"
                            placeholder="Amount"
                            name="amount"
                            value={amount}
                            onChange={this.handleInputChange}
                        />
                        <select name="term" value={term} onChange={this.handleInputChange}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                        <button onClick={this.createLoan}>Create Loan</button>
                    </div>
                )}

                <h3>Loan List</h3>
                {loading ? <p>Loading loans...</p> : (
                    <ul>
                        {loans.map((loan) => (
                            <li key={loan.id}>
                                Amount: {loan.amount}, Status: {loan.status}
                                {user.role === 'admin' && loan.status === 'PENDING' && (
                                    <>
                                        <button onClick={() => this.handleApprove(loan.id)}>Approve</button>
                                        <button onClick={() => this.handleReject(loan.id)}>Reject</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        );
    }
}

export default Loans;
