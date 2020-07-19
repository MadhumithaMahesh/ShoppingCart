import React,{useState} from 'react'
import Layout from '../core/Layout'
import { Redirect } from 'react-router-dom'
import {signin,authenticate,isAuthenticate} from '../auth/index'
const SignIn = ()=>{
    const {user} = isAuthenticate()
    const[values,setValues]= useState({
        email:'bmmadhumitha@gmail.com',
        password:'monika19',
        error:'',
        loading:false,
        redirectToRefererr:false

    })

    const {email,password,loading,error,redirectToRefererr} = values
    const handleChange = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    
    const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({ ...values, error: false,loading:true });
        signin({email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false,loading:false });
            } else {
               authenticate(data,()=>{
                setValues({
                    ...values,
                    redirectToRefererr:true
                });
               })
            }
        });
      
    }
const signInForm = ()=>{
    return(
        <form>
           <div class="form-group">
    <label className="text-muted">Email</label>
    <input onChange={handleChange('email')}  value={email} type="email" class="form-control" placeholder="Enter email"/>
  </div>
  <div class="form-group">
    <label className="text-muted">Password</label>
    <input onChange={handleChange('password')} value={password} type="password" class="form-control" placeholder="Enter Password"/>
  </div>
  <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
        
    )
   
}
const showError = ()=>{
    return(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )
}
const showLoading = ()=>{

    return(
       loading&&(<div className="alert alert-info">Loading...</div>)
    )
}

const redirectUser = ()=>
{
    if(redirectToRefererr)
    { if(user && user.role===0)
        return <Redirect to='/user/dashboard'></Redirect>
        else
         return <Redirect to='/admin/dashboard'></Redirect>
    }
   
     if(isAuthenticate())
     return <Redirect to='/'></Redirect>
}

    return(
    <Layout title='SignIn' description='SignIn to E commerce App' className="container col-md-8 offset-md-2">
     {showError()}
    {showLoading()}    
    {signInForm()}
    {redirectUser()}
   </Layout>
    )
}
export default SignIn