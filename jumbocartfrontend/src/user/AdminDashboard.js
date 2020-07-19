import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'
const AdminDashboard = ()=>{
const {user:{_id,name,email,role}} = isAuthenticate()
const adminLink = ()=>
{
    return(
        <div class="card mb-5">
  <div class="card-header">
    Admin Links
  </div>
  <ul class="list-group list-group-flush">
   <Link to='/create/category'><li class="list-group-item">Create Category</li></Link> 
   <Link to='/create/product'><li class="list-group-item">Create Product</li></Link>
   <Link to='/admin/orders'><li class="list-group-item">Admin Orders</li></Link>
   <Link to={'/admin/products'}><li class="list-group-item">Manage Products</li></Link>
  </ul>
</div>
    )
}
const adminInformation = ()=>
{
    return(
        <div class="card mb-5">
  <div class="card-header">
    Admin Information
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
        {adminLink()}
    </div>
    <div className="col-9">
        {adminInformation()}
    </div>
</div>

</Layout>)
}



export default AdminDashboard