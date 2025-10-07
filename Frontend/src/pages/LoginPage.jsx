import React, {useState}  from "react";
import './loginsignup.css'

import user_id from '../components/Assets/user_id.jpeg'
import email from '../components/Assets/email.jpeg'
import password from '../components/Assets/password.png'

const LoginSignup = () => {
    const[action,setAction] = useState("Sign Up");
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==="Login"?<div></div>:<div className='input'>
                <img src={user_id}  alt=""/>
                <input type="text" placeholder="Name"/>
            </div>}
            
            <div className='input'>
                <img src={email} alt=""/>
                <input type="email" placeholder="Email Id"/>
            </div>
            <div className='input'>
                <img src={password} alt=""/>
                <input type="password" placeholder="password"/>
            </div>
            {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password?<span>Click Here!</span></div>}
            
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>

            </div>
        </div>
    </div>
  )
}

export default LoginSignup
