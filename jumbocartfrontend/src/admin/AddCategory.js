import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {isAuthenticate} from '../auth/index'
import {createCategory} from './apiAdmin'

// const AddCategory = ()=>
// {
//     const[name,setName] = useState('')
//     const[error,setError] = useState('')
//     const[success,setSuccess] = useState('')

//     const {user,token} = isAuthenticate()
//     const handleChange = (e)=>{
//         setError('')
//         setName(e.target.value)

//     }
//     const clickSubmit = (e)=>{
//         e.preventDefault()
//         setError('')
//         setSuccess(false)
//         createCategory(user._id,token,{name}).then(data=>{
//             if(data){
//                 setError('')
//                 setSuccess(true)
//                 }
            
//             else{
//                 setError(false)
//             }
         
//         })

//     }

//     const showSuccess = ()=>{
//         if(success){
//             return <div>
//                 <h4 className="text-success">{name} is created</h4>
//             </div>
//         }
//     }
//     const showError = ()=>
//     {
//        if(error)
//        return<div>
//             <h4 className="text-danger">Category should be unique</h4>
//         </div>
//     }
//     const newCategoryForm = ()=>
//     {
//         return(
//             <form onSubmit={clickSubmit}>
//                 <div className="form-group">
//                 <label className="text-muted">Category</label>
//     <input onChange={handleChange} value={name} type="text" class="form-control" placeholder="Enter Category"/> 
//                 </div>
//                 <button className='btn-primary'>Create New Category</button>
//             </form>
//         )
//     }
//     return(
//         <Layout title='Create New Category' description={`Hello ${user.name} Are you ready to create a new category?`} className="container col-md-8 offset-md-2">
//        {showError()}
//        {showSuccess()}
//        {newCategoryForm()} 
//       </Layout>
//     )
// }
// export default AddCategory


const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticate();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;