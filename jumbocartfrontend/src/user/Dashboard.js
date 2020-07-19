import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'


const Dashboard = ()=>{
 
const {user:{_id,name,email,role}} = isAuthenticate()

const token = isAuthenticate()




const userLink = ()=>
{
    return(
        <div class="card mb-5">
  <div class="card-header">
    User Links
  </div>
  <ul class="list-group list-group-flush">
   <Link to='/cart'><li class="list-group-item">My Cart</li></Link> 
   <Link to={`/profile/${_id}`}><li class="list-group-item">Profile Update</li></Link>
   <Link to={`/orders/by/user/${_id}`}><li class="list-group-item">History</li></Link>
  </ul>
</div>
    )
}
const userInformation = ()=>
{
    return(
        <div class="card mb-5">
  <div class="card-header">
    User Information
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{name}</li>
    <li class="list-group-item">{email}</li>
    <li class="list-group-item">{role===1?'Admin':'Registered User'}</li>
  </ul>
</div>
    )
}

 
return(
<Layout title='Dashboard' description={`Hello ${name}`} className='container-fluid'>
<div className="row">
    <div className="col-3">
        {userLink()}
    </div>
    <div className="col-9">
        {userInformation()}
       
        {/* {JSON.stringify(history)} */}
        
        
        {/* {JSON.stringify(isAuthenticate())} */}


        
    </div>
</div>

</Layout>)
}



export default Dashboard