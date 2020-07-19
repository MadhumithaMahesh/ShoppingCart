import React,{useEffect,useState} from 'react'
import Layout from './Layout'
import {getCart} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom'
import CheckOut from './CheckOut'



const Cart = ()=>
{
    const[items,setItems] = useState([])
    const [run, setRun] = useState(false);

    const loadCart = (items)=>
    {
        return(
            <div>
                <h2>Your Cart has {`${items.length}`} items</h2>
                <hr></hr>
                {items.map((item,i)=>(
                    <Card key={i} product={item} showAddToCartButton={false}
                     showUpdateQuantityButton={true} removeFromCartButton={true}  
                     setRun={setRun}
                    run={run}></Card>
                ))}
            </div>
        )
    }
   
    const noItemsMessage = ()=>
    {
       return(<div>
            <h2>Your Cart Is Empty</h2>
        <br></br>
        <Link to ='/shop'>Continue Shopping</Link>
       </div>)
    }
  
useEffect(() => {
    setItems(getCart())
}, [run]);

    return(
        <Layout title='Cart' description='Add you Favorites Here'>
            <div className='row'>
                <div className='col-6'>
                   {items.length>0?loadCart(items):noItemsMessage()}
                </div>
                <div className='col-6'>
                  <h2>Cart Summary:</h2>
                  <hr></hr>
                  <CheckOut products={items} setRun={setRun} run={run}></CheckOut> 
                  <br></br>
                  
                </div>
            </div>
        </Layout>
    )
}

export default Cart