import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'
import { read,getPurchaseHistory } from "./ApiUser";
import moment from "moment";
import Card from '../core/Card'

const History = ({match})=>
{
    const [values, setValues] = useState({
        history:[],
    });
    const { token } = isAuthenticate();
    const { history } = values;
    // const init = (userId, token) => {
    //     getPurchaseHistory(userId, token).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //            setHistory(data);
       
    //         }
            
    //     });
    //   };
    //   useEffect(() => {
    //     init(match.params.userId, token);
    //   }, []);

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, history:data.history});
                console.log(data)
            }
        });
        // getPurchaseHistory(userId, token).then(data => {
        //             if (data.error) {
        //                 console.log(data.error);
        //             } else {
        //                 setValues({ ...values, history:data.history});
               
        //             }
                    
        //         });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);
    //   const purchaseHistory = history => {
    //     return (
    //         <div className="card mb-5">
    //             <h3 className="card-header">Purchase history</h3>
    //             <ul className="list-group">
    //                 <li className="list-group-item">
    //                     {history.map((h, i) => {
    //                         return (
    //                             <div>
    //                                 <hr />
    //                                 {h.products.map((p, i) => {
    //                                     return (
    //                                         <div key={i}>
    //                                             <h6>Product name: {p.name}</h6>
    //                                             <h6>
    //                                                 Product price: ${p.price}
    //                                             </h6>
    //                                             <h6>
    //                                                 Purchased date:{" "}
    //                                                 {moment(
    //                                                     p.createdAt
    //                                                 ).fromNow()}
    //                                             </h6>
    //                                         </div>
    //                                     );
    //                                 })}
    //                             </div>
    //                         );
    //                     })}
    //                 </li>
    //             </ul>
    //         </div>
    //     );
    // };

    

   
    
    return(
        <Layout title="History" description="View your history" className="container-fluid">
        <h2 className="mb-4">History</h2>
        {/* {purchaseHistory(history)} */}
        {/* {JSON.stringify(history)} */}
        <div>
                                  
                                {history.map((p, i) => {
                                     
                                        return (
                                      
                                            <div key={i}>
                                                      <hr />
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.amount}
                                                </h6>
                                                <h6>
                                                   Product description: {p.description}
                                                </h6>
                                                <h6>
                                                    Product Category: {p.category.name}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
        </Layout>
    )
}

export default History