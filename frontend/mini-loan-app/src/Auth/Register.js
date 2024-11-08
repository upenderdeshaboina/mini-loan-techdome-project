import React, { useState } from 'react';
import './Login.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('')
    const [passType,setType]=useState(false)
    const history=useHistory()

    const handleRegister = async (event) => {
        event.preventDefault()
        const credentials={ username, password,role };
        const options={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(credentials)
        }
        try {
            const response=await fetch('https://loan-app-apis.onrender.com/register',options)
            const data=await response.json()
            if (response.ok){
                alert(data.message)
                history.push('/')

            }else{
                alert(data.error)
            }
            setUsername('')
            setPassword('')
            setRole('')
        } catch (error) {
            
        }
        
    };

    const onChangeRole=(event)=>{
        setRole(event.target.value)
    }

    const onClickShow=()=>{
        setType(!passType)
    }

    if(localStorage.getItem('token')){
        return <Redirect to='/dashboard'/>
    }


    return (
        <div className='login-container'>
            <div className='form-container'>

            <form className='' onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className='input-container'>
                    <input className='input' type='text' id='username' placeholder='Enter your username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <i class='bx bxs-user'></i>
                </div>
                <div className='input-container'>
                    <input className='input' type={!passType?'password':'text'} id='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {passType?<i class='bx bxs-low-vision' onClick={onClickShow}></i>:
                    <i class='bx bx-show' onClick={onClickShow}></i>}
                </div>
                <div className='select-container'>
                    <label>Role: </label>
                    <select onChange={onChangeRole} value={role}>
                        <option value=''>Select your Role</option>
                        <option value="admin">Admin</option>
                        <option value='consumer'>Consumer</option>
                    </select>
                </div>

                <button type='submit' className='login-btn'>Register</button>
                <div className='register-container'>
                    <div className=''>
                        <p>Already have an account? <a href='/' className='register'>Login</a></p>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Register;
