import React from 'react'
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap'
import {AiFillDelete, AiOutlineShoppingCart} from'react-icons/ai'
import { Link } from 'react-router-dom'
import { CartState } from '../context/useContext'

const Header = () => {

  const {state : {cart}, dispatch, productDispatch} = CartState()

  return (
    <Navbar bg="dark" version="dark" style={{height : '80px'}}>
      <Container>
        <Navbar.Brand>
            <Link to="/" className='navbar-brand'>React Shop App</Link>
        </Navbar.Brand>
        <Navbar.Text className='search'>
            <FormControl 
            style={{ width : "500px"}} 
            placeholder="Search product..."
            className='m-auto'
            onChange={(e) => productDispatch({type : "FILTER_BY_SEARCH", payload : e.target.value})}
            />
        </Navbar.Text>
        <Nav>
            <Dropdown>
                <Dropdown.Toggle variant='success'>
                    <AiOutlineShoppingCart color="white" fontSize="25px"/>
                    <Badge bg='success'>
                        {cart.length}
                    </Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end" style={{minWidth : 370}}>
                    { cart.length > 0? (<>
                      {cart.map( item => (
                        <span className='cartItem' key={item.id}>
                          <img 
                          src={item.image} 
                          alt={item.name} 
                          className="cartItemImg"
                          />
                          <div className='cartItemDetail'>
                            <span>{item.name}</span>
                            <span style={{marginLeft : 'auto'}}>${item.price.split(".")[0]}</span>
                          </div>
                          <AiFillDelete 
                            fontSize="20px"
                            style={{cursor : "pointer"}}
                            onClick={() => 
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: item
                            })}
                          />
                        </span>
                      ))}
                      <Link to="/cart">
                        <Button style={{width : "95%", margin : '0 10px'}}>
                            Go To Cart
                        </Button>
                      </Link>
                    </>) 
                    : 
                    (<span style={{padding : 10}}>Cart is Empty!</span>)
                  }
                    
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
