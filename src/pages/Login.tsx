import React from 'react'
import '../App.css'

function Login() {
  return (
    <>
    <div className='Login-page'>
    <div className='Login-container'>
    <div className='login'>Email address</div>
    <input type="text" />
    <div className='login'>Password</div>
    <input type="text" />
    <button type="button" className="btn btn-light">LOGIN</button>
    <button type="button" className="btn btn-light">CREATE AN ACCOUNT</button>
    </div>
    </div>
    </>
  )
}

export default Login