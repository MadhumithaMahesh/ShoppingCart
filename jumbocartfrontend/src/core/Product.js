import React ,{useState,useEffect}from 'react'
import Layout from '../core/Layout'
import { read,listRelated } from './apiCore'
import Card from './Card'

const Product = (props)=>
{
    const [product,setProduct] = useState({})
    const [error,setError] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])

    const loadSingleProduct = (productId)=>{
        read(productId).then(data=>{
                if(data.error)
                {
                    setError(data.error)
                }else{
                    setProduct(data)
                }
                listRelated(data._id).then(data=>
                    {
                        if(data.error)
                        {
                            setError(data.error)
                        }else{
                            setRelatedProducts(data)
                        }  
                    })

            })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props]);
    return(
  <Layout className='container-fluid' title ={product && product.name} description={product && product.description &&product.description}>
    <div className='row'>
        <div className="col-9">
        {product && product.description&&(<Card product={product} showViewProductButton={false}></Card>)}
        </div>
        <div className='col-3'>
            <h2>Related Products</h2>
            {relatedProducts.map((relatedProduct,i)=>(
                <Card product={relatedProduct}></Card>
            )
                
            )}
        </div>
    </div>
      
  </Layout>
    )
}

export default Product
