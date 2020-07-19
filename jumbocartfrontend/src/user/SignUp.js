import React,{useState} from 'react'
import{Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth/index'

const SignUp = ()=>{
    const[values,setValues]= useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:''
    })

    const {name,email,password,success,error} = values
    const handleChange = name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    
    const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
      
    }
const signUpForm = ()=>{
    return(
        <form>
            <div class="form-group">
    <label className="text-muted">Name</label>
    <input onChange={handleChange('name')} value={name} type="text" class="form-control" placeholder="Enter Name"/>
  </div>
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
const showSuccess = ()=>{

    return(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
            New Account Created. Please <Link to='/signin'>Sign In </Link>
        </div>
    )
}

    return(
    <Layout title='SignUp' description='SignUp to E commerce App' className="container col-md-8 offset-md-2">
     {showError()}
    {showSuccess()}    
    {signUpForm()}
   </Layout>
    )
}
export default SignUp