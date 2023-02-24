import React from 'react'
import { Button, Col, FormControl, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/useContext'

import Rating from './Rating'

const Cart = () => {

  const {state: {cart}, dispatch} = CartState()

  const total = cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)

  return (
    <div className="home">
      <div className='productContainer'>
        <ListGroup>
          {
            cart.map( item => 
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <img className='cartItem-image' src={item.image} alt={item.name} />
                </Col>
                <Col md={2}>
                  <span>{ item.name }</span>
                </Col>
                <Col md={2}>
                  <span>${ item.price }</span>
                </Col>
                <Col md={2}>
                  <Rating rating={item.ratings}></Rating>
                </Col>
                <Col md={2}>
                  <FormControl 
                  as="select" 
                  value={item.qty}
                  onChange={(e) => dispatch({type : "CHANGE_CART_QUANTITY", payload : {
                    id: item.id,
                    qty: e.target.value
                  }})}
                  >
                    {
                      [...Array(item.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))
                    }
                  </FormControl>
                </Col>
                <Col md={2}>
                  <Button
                      type='button'
                      variant='light'
                      onClick={() => 
                      dispatch({
                        type : "REMOVE_FROM_CART",
                        payload: item
                      })}
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                </Col>
              </Row> 
            </ListGroup.Item> 
            )
          }
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>
          Subtotal ({cart.length}) items
        </span>
        <span style={{fontWeigth : 700, fontSize : '20px'}}>
          Total: $ {total}
        </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
