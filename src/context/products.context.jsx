import {createContext, useState} from 'react'
import PRODUCTS from '../shop-data.json'

// context
export const ProductContext = createContext({
    products:[],    

});

//context provider
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )

}