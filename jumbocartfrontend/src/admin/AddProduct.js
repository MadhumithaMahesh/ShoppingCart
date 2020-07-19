import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'
import {createProduct,getCategories} from './apiAdmin'

const AddProduct = ()=>
{
    const{user,token} = isAuthenticate()
    const[values,setValues] = useState({
        name:'',
        description:'',
        price:'',
        quantity:'',
        shipping:'',
        categories:[],
        category:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''


    })
    const {name,
    description,
    price,
    quantity,
    shipping,
    categories,
    category,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData} = values

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

useEffect(() => {
    init()
}, []);
    const handleChange = name=>event=>
    {
        const value = name ==='photo'? event.target.files[0]:event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
    const clickSubmit = (event)=>
    {
        event.preventDefault()
        setValues({...values,error:'',loading:true})
        createProduct(user._id,token,formData)
        .then(data=>
            {
                if(data.error)
                {
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,loading:false,createdProduct:data.name})
                    // name:'',description:'',quantity:'',price:'',category:'',shipping:'',photo:'',
                }
            })
    }

    const newPostForm =()=>
    (
        <form onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                <option>Please select</option>
    {categories&&categories.map((c,i)=>(<option key={i}value={c._id}>{c.name}</option>) )}
                        
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )
    const showError = ()=>(
    <div className='alert alert-danger' style={{display:error?'':'none'}}>  
      <h4>{error}</h4>  

    </div>
    )
    const showSuccess = ()=>(
        <div className='alert alert-success' style={{display:createdProduct?'':'none'}}>  
          <h4>{createdProduct} is created</h4>  
    
        </div>
        )
        const showLoading = ()=>(
            <div className='alert alert-success' style={{display:loading?'':'none'}}>  
              <h4>Loading...</h4>  
        
            </div>
            )
    return(
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new Product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                  {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct