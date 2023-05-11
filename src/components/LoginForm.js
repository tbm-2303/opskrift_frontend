import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"

function LoginForm ({login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const navigate = useNavigate()
    
    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
        navigate('/');
    }

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }

    return (
        <>  
            <div className='login'>
                <form onChange={onChange}>
                    <input placeholder="Username" id="username"/>
                    <input placeholder="Password" id="password"/>
                    <button className="" onClick={performLogin}>Login</button>
                </form> 
            </div>
        </>  
   
    )
}

export default LoginForm
