import React from 'react'
import { CartState } from '../context/useContext'
import Filters from './Filters';
import SingleItem from './SingleItem';

const Home = () => {
  
  const { state: {products}, productState : {sort, byStock, byFastDelivery, byRating, searchQuery}} = CartState();

  const transformProducts = () => {

    let sortedProducts = products;

    if(sort){
     sortedProducts = sortedProducts.sort((a, b) => sort === 'lowToHigh'? a.price - b.price: b.price - a.price)
    }
    if(!byStock){
     sortedProducts = products.filter( product => product.inStock);
    }

    if(byFastDelivery){
      sortedProducts = products.filter( product => product.fastDelivery);
    }

    if(byRating){
      sortedProducts = products.filter( product => product.ratings >= byRating);
    }

    if(searchQuery){
      sortedProducts = products.filter( product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return sortedProducts
  }

  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {transformProducts().map( item => {
          return (
            <SingleItem item={ item } key={item.id}/>
          )
        })}
      </div>
    </div>
  )
}

export default Home
