import React,{useEffect,useState} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'
const Home = ()=>
{
    const [productsBySell,setProductsBySell] = useState([])
    const [productsByArrival,setProductsByArrival] = useState([])
    const [error,setError] = useState(false)
    const loadProductBySell = ()=>(
        getProducts('sold').then(data=>{
            if(data.error)
            {
                setError(data.error)
            }else{
                setProductsBySell(data)
            }
        })
    )
    const loadProductByArrival = ()=>(
        getProducts('createdAt').then(data=>{
            if(data.error)
            {
                setError(data.error)
            }else{
                setProductsByArrival(data)
            }
        })
    )
    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, []);
    return(
        <Layout title='Home' description='E commerce App' className="conatiner-fluid">
            <Search></Search>
        <h2>New Arrival</h2>
        <div className="row">
        {productsByArrival.map((product,i)=>(
            <div key={i} className="col-4 mb-3">
                <Card product={product}></Card>
            </div>
        ))}
        </div>
        <h2>Best Sellers</h2>
        <div className="row">
        {productsBySell.map((product,i)=>(<div key={i} className="col-4 mb-3">
                <Card product={product}showViewProductButton> </Card>
            </div>))}
        </div>
        
        </Layout>
    )
}
export default Home