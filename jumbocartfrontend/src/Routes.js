import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Home from './core/Home'
import PrivateRoute from '../src/auth/PrivateRoute'
import AdminRoute from '../src/auth/AdminRoute'
import Dashboard from './user/Dashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'
import Profile from './user/Profile'
import History from './user/History'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'


const Routes = ()=>
{
    return(
        <BrowserRouter>
        <Switch>
        <Route path='/' exact component={Home}></Route>  
         <Route path='/signin' exact component={SignIn}></Route>
         <Route path='/signup' exact component={SignUp}></Route> 
         <Route path='/shop' exact component={Shop}></Route>
         <PrivateRoute path ='/user/dashboard' exact component ={Dashboard}></PrivateRoute>  
         <AdminRoute path ='/admin/dashboard' exact component ={AdminDashboard}></AdminRoute>
         <AdminRoute path ='/create/category' exact component ={AddCategory}></AdminRoute> 
         <AdminRoute path ='/create/product' exact component ={AddProduct}></AdminRoute> 
         <Route path='/product/:productId' exact component={Product}></Route>  
         <Route path='/cart' exact component={Cart}></Route>
         <AdminRoute path ='/admin/orders' exact component ={Orders}></AdminRoute> 
         <PrivateRoute path='/profile/:userId' exact component={Profile}></PrivateRoute> 
          <PrivateRoute path='/orders/by/user/:userId' exact component={History}></PrivateRoute>
          <AdminRoute path ='/admin/products' exact component ={ManageProducts}></AdminRoute>
          <AdminRoute path ='/admin/product/update/:productId' exact component ={UpdateProduct}></AdminRoute> 
        </Switch>
        </BrowserRouter>
    )
}

export default Routes