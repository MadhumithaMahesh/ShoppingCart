import React, { useState } from 'react'
import {Link,Redirect} from 'react-router-dom' 
 import ShowImage from './ShowImage'
 import moment from 'moment'
 import {addItem,updateItem,removeItem} from './cartHelpers'

const Card = ({product,showViewProductButton=true,showAddToCartButton = true,
  showUpdateQuantityButton=false,removeFromCartButton =false,setRun = f => f, 
  run = undefined })=>{
  const[redirect,setRedirect] = useState(false)
  const[count,setCount] = useState(product.count)
  const showViewButton = (showViewProductButton)=>{
  return(showViewProductButton&&(<Link to={`/product/${product._id}`}>
  <button className="btn btn-primary mt-2">View Product</button>
    
</Link>))
}

const handleChange = productId=>event=>
{ 
  setRun(!run)    
  setCount(event.target.value < 1 ? 1 : event.target.value);
  if (event.target.value >= 1) {
    updateItem(productId, event.target.value);
  }
}
const showUpdateQuantity = (showUpdateQuantityButton)=>
{
  return(showUpdateQuantityButton&&(
    <div>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Set Quantity</span>
      </div>
      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
    </div>
  </div>
  ))
}
const removeFromCart = (removeFromCartButton)=>
{
  return(removeFromCartButton&& ( 
  <button onClick={()=>{removeItem(product._id)
  setRun(!run)}} className="btn btn-outline-warning mt-2 mb-2 card-btn-1">
  Remove From Cart
  </button>))
}


// const addToCart = (product)=>
// {
//  addItem(product,()=>{
//   setRedirect(true)
//  })
// }
// const redirectUser = (redirect)=>
// {
//     if(redirect)
//     {
//       return <Redirect to='/cart'></Redirect>
//     }
// }
const addToCart = () => {
  // console.log('added');
  addItem(product, ()=>
  {
    setRedirect(true)
  });
};

const shouldRedirect = redirect => {
  if (redirect) {
    return <Redirect to="/cart" />;
  }
};
const showAddToCartBtn = (showAddToCartButton)=>
{
  
    return (showAddToCartButton && ( <button onClick={addToCart}  className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
    Add to cart
  </button>)
     
       
      )
  
  
}

const showStock = quantity => {
  return quantity > 0 ? (
    <span className="badge badge-primary badge-pill">In Stock </span>
  ) : (
    <span className="badge badge-primary badge-pill">Out of Stock </span>
  );
}
  return(
<div className="card">
  <div class="card-body">
{shouldRedirect(redirect)}
<ShowImage item={product} url='product'></ShowImage>
<h5 class="card-header">{product.name}</h5>
<p class="card-text">{product.description}</p>
<p className="card-text">{product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br></br>
      {showViewButton(showViewProductButton)}
      <br></br>
      {showAddToCartBtn(showAddToCartButton)}
      <br></br>
      {showUpdateQuantity(showUpdateQuantityButton)}
      {removeFromCart(removeFromCartButton)}

  </div>
</div>
  )
}

export default Card