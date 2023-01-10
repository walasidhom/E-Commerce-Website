import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from './Store';

const CartScreen = () => {
    const navigate = useNavigate();
    //get Context
    const { state, dispatch: ctxDispatch } = useContext(Store);
    //state's destructuring
    const { cart: { cartItems } } = state;

    const updateCartHandler = async (item, quantity) => {
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
        
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
  return (
      <div>
          <Helmet>
              <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>
          <Row>
              <Col md={8}>
                  {/* { console.log(cartItems[1].quantity) } */}
                  {cartItems.length === 0 ?
                      (<MessageBox>
                          Cart is empty{'  '}
                          <Link to='/'>Go shopping</Link>
                      </MessageBox>)
                      :
                      (
                          <ListGroup>
                              {cartItems.map((item) => (
                                    
                                  <ListGroup.Item key={item._id}>
                                      <Row className='align-items-center' >
                                          <Col md={4}>
                                              <img src={item.image}
                                                alt={item.name}
                                                  className='small'></img>{' '}
                                              <div className="min-30">
                                                  <Link to={`/product/${item.slug}`}>
                                                      {item.name}
                                                  </Link>
                                              </div>
                                              
                                          </Col>
                                          <Col md={3}>
                                              <Button variant='light'
                                                disabled={item.quantity === 1}
                                                onClick={()=>updateCartHandler(item , item.quantity -1)}>
                                                  <i className='fa fa-minus-circle'></i>
                                              </Button>{' '}
                                              <span>{item.quantity}</span>{' '}
                                              <Button variant='light'
                                                disabled={item.quantity === item.countInStock}
                                                onClick={()=>updateCartHandler(item , item.quantity +1)}>
                                                  <i className='fa fa-plus-circle'></i>
                                              </Button>
                                          </Col>
                                          <Col md={3}>${item.price}</Col>
                                          <Col md={2}>
                                              <Button variant='light'
                                                onClick={()=>removeItemHandler(item)}>
                                                  <i className='fa fa-trash'></i>
                                              </Button>
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>
                              ))}
                          </ListGroup>
                      )
                      }
              </Col>
              <Col md={4}>
                  <Card>
                      <Card.Body>
                          <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h3>
                                      Total ({cartItems.reduce( (a,c) => a+c.quantity , 0)} products) : ${cartItems.reduce( (a,c) => a+c.price * c.quantity , 0)}
                                  </h3>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <div className='d-grid'>
                                      <Button
                                          style={{ backgroundColor: 'gold', borderColor: 'black' , color:'black'}}
                                          disabled={cartItems.length === 0}
                                      onClick={checkoutHandler}>
                                          Proceed to Checkout
                                    </Button>
                                </div>
                              </ListGroup.Item>
                          </ListGroup>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    </div>
  )
}

export default CartScreen