import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import './Login.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('')
    const [passType,setType]=useState(false)
    const history=useHistory()
    

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials={ username, password,role };
        const options={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(credentials)
        }
        try {
            const response=await fetch('https://loan-app-apis.onrender.com/login',options)
            const data=await response.json()
            if (response.ok){
                localStorage.setItem('token',data.token)
                history.push('/dashboard')
                
            }else{
                alert(data.error)
            }
        } catch (error) {
            console.log(error)
        }
        
    };

    const onChangeRole=(event)=>{
        setRole(event.target.value)
    }

    const onClickShow=()=>{
        setType(!passType)
    }


    return (
        <div className='login-container'>
            <div className='form-container'>

            <form className='' onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className='input-container'>
                    <input className='input' type='text' id='username' placeholder='Enter your username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <i className='bx bxs-user'></i>
                </div>
                <div className='input-container'>
                    <input className='input' type={!passType?'password':'text'} id='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {passType?<i className='bx bxs-low-vision' onClick={onClickShow}></i>:
                    <i className='bx bx-show' onClick={onClickShow}></i>}
                </div>
                <div className='select-container'>
                    <label>Role: </label>
                    <select onChange={onChangeRole} value={role}>
                        <option value=''>Select your Role</option>
                        <option value="admin">Admin</option>
                        <option value='consumer'>Consumer</option>
                    </select>
                </div>

                <button type='submit' className='login-btn'>Login</button>
                <div className='register-container'>
                    <div className=''>
                        <p>Don't have an account? <a href='/register' className='register'>Register</a></p>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
