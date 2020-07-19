import React,{useEffect,useState} from 'react'
import{getBrainTreeToken,processPayment,createOrder} from './apiCore'
import{Link} from 'react-router-dom'
import {isAuthenticate} from '../auth/index'
import DropIn from 'braintree-web-drop-in-react'
import {cartEmpty} from './cartHelpers'



const CheckOut = ({products,setRun = f => f, run = undefined })=>
{
  const[data,setData]=useState({
      clientToken:null,
      instance:{},
      error:'',
      address:'',
      success:false
   
  })
  const userId = isAuthenticate() && isAuthenticate().user._id
  const token = isAuthenticate() && isAuthenticate().token
  const getToken = (userId,token)=>
  {
      getBrainTreeToken(userId,token).then(data=>
        {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        })
  }
  const handleAddress = (event)=>
  {
      setData({...data,address:event.target.value})
  }
 
  let deliveryAddress = data.address
  const payAmount = ()=>
  {
    //   let nonce;
    //   let getNonce = data.instance.requestPaymentMethod().then(data=>
    //     {
    //         console.log(data)
    //         nonce = data.nonce
    //         const paymentData = {
    //             paymentMethodNounce:nonce,
    //             amount:getTotal(products)
    //         }
    //         processPayment(userId,token,paymentData).then(response=>{
    //            setData({...data,success:response.success})
    //         })
    //     })
    let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response)
                        const createOrderData = {
                            products:products,
                            transactionId:response.transaction.id,
                            amount:response.transaction.amount,
                            address:deliveryAddress
                        }
                    createOrder(userId,token,createOrderData)
                    .then(response=>{
                        cartEmpty(()=>
                        {
                            setRun(!run)
                            console.log('pay done & cart empty')
                            setData({success:true})
                        })
                    })
                    }).catch(error=>
                        {
                            console.log(error)
                        })
               
                })
               
            
        .catch(error=>
            {
                console.log('drop in error',error)

                setData({...data,error:error.message})
            })
        } 
  const showDropIn = ()=>
(
    <div onBlur={()=>{setData({...data,error:''})}}>
       {data.clientToken && products.length>0?(
           <div>
               <div className="group-group mb-3">
                   <label className="text-muted">Delivery Address</label>
               <textarea
               onChange={handleAddress}
               className='form-control'
               value={data.address}
               placeholder='Type Delivery address'
               ></textarea>
               </div>
          
           <DropIn
               options={{ authorization: data.clientToken}}
               onInstance={(instance) => (data.instance = instance)}
             />
             <button className="btn btn-success" onClick={payAmount}>Pay</button></div>):null} 
             </div>
)

  useEffect(() => {
      getToken(userId,token)
  },[]);

  const getTotal = () => (products.reduce((currentValue, nextValue) => (currentValue + nextValue.count * nextValue.price)
  , 0))
    
;

    const showCheckout = () => {
        return isAuthenticate() ? (
            <div >{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    }

    const showError=error=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            <h4>{error}</h4>
        </div>
    )
    const showSuccess=success=>(
        <div className="alert alert-danger" style={{display:success?'':'none'}}>
            <h4>Thanks for Shopping!Payment was successful.</h4>
        </div>
    )
 return(
     <div>
         {products.length>0?(<h2>Total: ${getTotal()}</h2> ):''} 
        {/* (<div>
            <h2>Your Cart Is Empty</h2>
        <br></br>
        <Link to ='/shop'>Continue Shopping</Link></div>) */}
         <br></br>
         {showSuccess(data.success)}
         {showError(data.error)}
         {showCheckout()}
     </div>
 )
}

export default CheckOut