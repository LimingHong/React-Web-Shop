import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { CartContext } from '../../context/cart.context'

const Navigation = () =>{
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext)
  // const signOutHandler = async() => {
  //   const response = await signOutUser()
  //   console.log(response);
  //   setCurrentUser(null);
  // }
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
        {
          currentUser ? 
          (<span className = 'nva-link' onClick={signOutUser}>
              SIGN OUT
            </span>) :( <Link className='nav-link' to= '/auth'>
            SIGN IN
         </Link>)
        }
        <CartIcon></CartIcon>

        </div>
        {isCartOpen && <CartDropdown></CartDropdown>}
        </div>
        <Outlet></Outlet>
      </Fragment>
    )
}
//{isCartOpen && <CartDropdown></CartDropdown>} isCartOpen == true show right false not show
export default Navigation