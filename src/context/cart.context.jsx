import {createContext, useState, useEffect} from 'react'

const addCartItem = (cartItems, productToAdd) =>{
    //find if cartItems constains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === productToAdd.id
        );
    //if found increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=> 
        cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem 
        );
    }else{

        console.log("Not exist in cart");
    };
    // return new array with modified cartItems/ new cart item
    //...cartItems all the existing product and add new with quantity 1
    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
     // find the cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === cartItemToRemove.id
        );
   
    // check if quantity is equal to 1, if it is remove that item from cart
    if(existingCartItem.quantity===1){
        
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
        
    }
    //return back cartitem with matching cart item with reduce quantity
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
    ?{...cartItem, quantity:cartItem.quantity -1}
    :cartItem);
    // return a new object with same properties except quantity -1
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove 
   return cartItems.filter(
       (cartItem)=>cartItem.id !== cartItemToRemove.id
       );
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemToCart: () =>{},
    clearItemFromCart: () => {},
    total: 0,
});
/*
product
{
id,
name,
price,
imageUrl
}

Cart Item 
{
id,
name,
price,
imageUrl,
quantity
}
*/ 

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+ cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem)=>total+ cartItem.price * cartItem.quantity, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const clearItemFromCart = (CartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, CartItemToRemove));
        console.log({cartItems, CartItemToRemove});
    };

    const removeItemToCart = (CartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, CartItemToRemove));
        console.log({cartItems, CartItemToRemove});
    };
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        cartItems, 
        cartCount,
        cartTotal,
        clearItemFromCart,
    };
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider> 

}