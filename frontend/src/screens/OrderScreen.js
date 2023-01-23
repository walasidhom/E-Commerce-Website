import React, { useEffect } from 'react'
import {  Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import { detailsOrder } from '../JS/Actions/orderActions'
import MessageBox from '../components/MessageBox'

const OrderScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {id : orderId} = params
    
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading } = orderDetails;
    
    
    
    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId]);
    
    return(
        loading ? <LoadingBox /> : (
            <div>
                <div className="container small-container">
                    <Helmet>
                    <title>Order {orderId}</title>
                    </Helmet>
                    <h1 className='my-3' style={{ fontSize: '30px' }}>Order {orderId}</h1>
                        <Row>
                            <Col md={8}>
                                <Card className="mb-3">
                                    <Card.Body>
                                    <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Shipping</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address: </strong> {order.shippingAddress.address},
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {order.isDelivered ?
                                        <MessageBox variant='success'>Delivered At {order.deliveredAt}</MessageBox>
                                    : <MessageBox variant='danger'>Not Delivered</MessageBox>}
                                    </Card.Body>
                            </Card>  
                            <Card className="mb-3">
                                <Card.Body>
                                <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Payment</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Method:</strong> {order.paymentMethod}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {order.isPaid ?
                                        <MessageBox variant='success'>Paid At {order.paidAt}</MessageBox>
                                    : <MessageBox variant='danger'>Not Paid</MessageBox>}
                                </Card.Body>
                            </Card>
                            <Card className="mb-3">
                                <Card.Body>
                                    <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Order Items</h3>
                                </ListGroup.Item>
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item.product}>
                                        <Row className="align-items-center">
                                        <Col md={5}>
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="small"
                                            ></img>{' '}
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            <span>{item.qty}</span>
                                        </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={3}><strong>total: </strong>${item.price * item.qty}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    ))}
                                    </ListGroup>
                                    <div style={{ textAlign: 'right' }}>
                                    </div>    
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                    <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>Order Summary</h3>
                                </ListGroup.Item>
                                    
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col style={{textAlign:"right"}}>${order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col style={{textAlign:"right"}}>${order.shippingPrice.toFixed(2)}</Col>
                                        </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col style={{textAlign:"right"}}>${order.taxPrice.toFixed(2)}</Col>
                                        </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            <strong> Order Total</strong>
                                            </Col>
                                            <Col style={{textAlign:"right"}}>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>
                                        
                                    </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                    </Row>
                </div>
        </div>
  ))
}

export default OrderScreen