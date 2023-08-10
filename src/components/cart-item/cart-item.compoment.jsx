import './cart-item.styles.scss'
const CartItem = ({cartItem}) => {
    // if pass new cartItem object its going to render cartItem
    const {name, quantity, imageUrl, price} = cartItem;
    return (
        <div className='cart-item-container'>
            <img src = {imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )

}

export default CartItem