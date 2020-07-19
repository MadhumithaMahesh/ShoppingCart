import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'
import {getOrder,getStatusValues,updateStatusValues} from './apiAdmin'
import moment from 'moment'

const Orders = ()=>
{
    const[orders,setOrders] = useState([])
    const[statusValues,setStatusValues] = useState([])
    const {user,token} = isAuthenticate()
    const loadOrders = ()=>
    {
        
        getOrder(user._id,token).then(data=>{
            if(data.error)
            {
                return console.log(data.error)
            }
            
                return setOrders(data)
               
            
    })
  
}
const loadStatusValues= ()=>
{
    
    getStatusValues(user._id,token).then(data=>{
        if(data.error)
        {
            return console.log(data.error)
        }
        
        setStatusValues(data)
           
        
})

}
useEffect(() => {
    loadOrders()
    loadStatusValues()
}, []);

const showOrdersLength = () => {
    if (orders.length > 0) {
        return (
            <h1 className="text-danger display-2">
                Total orders: {orders.length}
            </h1>
        );
    } else {
        return <h1 className="text-danger">No orders</h1>;
    }
};
const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
            <div className="input-group-text">{key}</div>
        </div>
        <input
            type="text"
            value={value}
            className="form-control"
            readOnly
        />
    </div>
);

const handleStatusChange = (e, orderId) => {
    updateStatusValues(user._id, token, orderId, e.target.value).then(
        data => {
            // if (data.error) {
            //     console.log("Status update failed");
            // } else {
            //     
            // }
            console.log(data)
            loadOrders();
        }
    );

};

const showStatus = o => (
    <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        <select
            className="form-control"
            onChange={e => handleStatusChange(e, o._id)}
        >
            <option>Update Status</option>
            {statusValues.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
            ))}
        </select>
    </div>
);
 


    return(
        <Layout
        title="Orders List"
        description={`Good Day ${user.name}ready to view your orders?`}
        className="container-fluid"
    >
        <div className="row">
            <div className="col-8 offset-md-2">
    {showOrdersLength()}
    {orders.map((o,oIndex)=>
    {
        return(
        <div className="mt-5"key={oIndex} style={{borderBottom:'4px solid'}}>
            <h2 className='mb-5'>
        <span className="bg-primary">Order Id:{o._id}</span>
        </h2>
       <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        Status: {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transactionId}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>
                                
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>
                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}

        </div>
        )
    })}
     </div>
        </div>                                       
    </Layout>
    )

}

export default Orders