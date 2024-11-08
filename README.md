# Loan Repayment App

## Description

The **Loan Repayment App** is a web application that allows users to manage their loan repayments. Consumers can view their loan details and make repayments, while admins can manage loans by approving or rejecting applications. This app is built with **React** for the frontend and **Node.js** with **Express** for the backend. JWT is used for authentication, and data is stored in **SQLite**.

## Features

- **Consumers**:
  - View loan repayment details.
  - Make repayments for pending loans.
  - View due dates and loan status.
  
- **Admins**:
  - View, approve, and reject loan applications.
  
- **Authentication**:
  - Secure JWT-based login for both consumers and admins.
  
- **Error Handling**:
  - Clear error messages for failed actions or API calls.

## Technologies Used

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express, JWT for authentication, MongoDB/SQLite for data storage

## Installation

To set up the app locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/loan-repayment-app.git

```

### 2.Install Dependencies
Navigate to the project directories and install dependencies for both backend and frontend.

#### Backend

```bash
cd backend
npm install
```
#### Frontend
```bash
cd frontend
npm install
```
### 3. Set Up Environment Variables Backend
Create a .env file in the backend directory and add the following variables:
```env
ACCESS_TOKEN='secret_token'
PORT=3008
```
### 4.Start the Development Server
To start the servers:
#### Backend
```bash
cd backend
node index.js
```
#### Frontend
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000, and the backend will run on http://localhost:3008.

### Usage
- Consumer Login: Log in to view and manage your loan repayments.
- Admin Login: Log in to manage all loans (approve or reject).
- Repayment List: Make repayments on pending loans.
- Loan Approval: Admins can change the status of loans.

## API Endpoints
### /loans
-  **GET**: Retrieve loans (all loans for admins; individual loans for consumers).
- **POST**: Consumers can create a new loan.
- **PATCH**: Admins can approve or reject loans.
### /repayments
- **GET**: Retrieve repayment information for the logged-in user.
- **POST**: Make a repayment for a loan.
Authentication
- **Login**: POST to /login with email and password to receive a JWT.
- **Register**: POST to /register with email and password to register

## Deployment
The app can be deployed using:

**Full stack**: Netlify and Vercel.  
**Backend**: Heroku or DigitalOcean.

## Contact
For questions or feedback, feel free to reach out at [upenderdeshaboina12@gmail.com](mailto:upenderdeshaboina12@gmail.com).