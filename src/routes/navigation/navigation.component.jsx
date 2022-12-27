import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
const Navigation = () =>{
    return (
      <Fragment>
        <div className='navigation'>
        <Link className='logo-container' to='/'>
            <CrwnLogo className='logo'/>
        </Link>
          
        <div className='nav-links-container'>
        
        <Link className='nav-link' to= '/shop'>
            Shop
        </Link>
        <Link className='nav-link' to= '/signIn'>
           Sign In
        </Link>
        </div>

        </div>
        <Outlet></Outlet>
      </Fragment>
    )
}
export default Navigation