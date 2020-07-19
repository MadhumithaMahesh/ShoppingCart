import React from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
import{signout,isAuthenticate} from '../auth/index'
import { Fragment } from 'react'
import {itemTotal} from './cartHelpers'

const Menu = ({history})=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link" to='/'>Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to='/shop'>Shop <span class="sr-only"></span></Link>
      </li>
      <li class="nav-item">
    <Link class="nav-link" to='/cart'>Cart<sup><small>{itemTotal()}</small></sup> <span class="sr-only"></span></Link>
      </li>
      {isAuthenticate() && isAuthenticate().user.role===0 &&(<li class="nav-item">
        <Link class="nav-link" to='/user/dashboard'>Dashboard <span class="sr-only">(current)</span></Link>
      </li>)}
      {isAuthenticate() && isAuthenticate().user.role===1 &&(<li class="nav-item">
        <Link class="nav-link" to='/admin/dashboard'>Dashboard <span class="sr-only">(current)</span></Link>
      </li>)}
      

        {!isAuthenticate() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticate() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer" }}

                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
       
  
    
    </ul>
  </div>
</nav>
    )
}

export default withRouter(Menu)