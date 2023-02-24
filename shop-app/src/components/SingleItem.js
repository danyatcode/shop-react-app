import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { CartState } from '../context/useContext'
import Rating from './Rating'

const SingleItem = ({item}) => {

  const {
    state: { cart },
    dispatch
  } = CartState();
  
  return (
    <div className='products'>
      <Card>
        <Card.Img variant="top" src={item.image} alt={item.name}></Card.Img>
        <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom : 10}}>
                <span>$ {item.price.split(".")[0]}</span>
                {item.fastDelivery? (
                    <div>Fast Delivery</div>
                ):
                (
                    <div>4 days Delivery</div>
                )
                }
                <Rating rating={item.ratings}/>
            </Card.Subtitle>

              {cart.some(p => p.id === item.id)?
              (<Button 
                onClick={() => dispatch({type : 'REMOVE_FROM_CART', payload : item})} 
                variant="danger">
                Remove From Cart
              </Button>)
              :
              (<Button 
                onClick={() => dispatch({type : 'ADD_TO_CART', payload : item})} 
                disabled={!item.inStock} variant="primary">
                {!item.inStock? "Out of Stock" : "Add to Cart"}
              </Button>)}
            
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleItem
