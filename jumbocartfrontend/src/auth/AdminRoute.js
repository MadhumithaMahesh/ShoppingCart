import React,{Component} from 'react'
import{Route,Redirect} from 'react-router-dom'
import {isAuthenticate} from './index'


const AdminRoute = ({component:Component,...rest})=>(
    <Route {...rest}
    render = {props=>isAuthenticate() && isAuthenticate().user.role===1?(<Component {...props}></Component>):(
        <Redirect to={{pathname:'/signin',state:{from:props.location}}}></Redirect>
    )}
        />
        
)

export default AdminRoute