import React, { createContext, useContext, useReducer } from 'react'
import {faker} from '@faker-js/faker'
import { cartReducer, productReducer } from './useReducer';

const Cart = createContext();
faker.seed(99)

const Context = ({children}) => {

  const products = [...Array(20)].map( () => {
   return { 
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    price : faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.helpers.arrayElement([0, 2, 4, 6 ,7]),
    fastDelivery: faker.datatype.boolean(),
    }

  })

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: []
  });


  const [productState, productDispatch] = useReducer(productReducer, {
    byStock : false,
    byFastDelivery : false,
    byRating: 0,
    searchQuery: ""
  })

  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(Cart)
}
