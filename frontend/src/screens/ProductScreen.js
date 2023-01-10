import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { motion } from "framer-motion";
import { getError } from '../components/utils';
import { Store } from './Store';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false , product:action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false ,  error : action.payload};
    default:
      return state;
  }
}


const ProductScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{loading , error , product}, dispatch] = useReducer(reducer, {loading:true , error:'' , product:[]})

    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({ type: 'FETCH_SUCCESS' , payload:result.data });
        } catch (error) {
          dispatch({ type: 'FET CH_FAIL' , payload:getError(error) });
        }
            
            
        };
        fetchData();
    }, [slug])
    
  
  //get Context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    //AJAX req
    const { data } = await axios.get(`/api/products/${product._id}`);
    //find if the current product exists in the cart or not
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
    }
    
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    navigate('/cart');
  }; 
  return (
      <div>
      {loading ?
        <LoadingBox />
        :
        error ?
          <MessageBox variant='danger'>{error}</MessageBox>
          :
          <div>
            <Row>
              <Col md={6}>
                <motion.div
                
                animate={{ x: [-1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2 }}>
                <img
                  src={product.image}
                  alt={product.name}
                    className='img-large' />
                  </motion.div>
              </Col>
              <Col md={3}>
                <motion.div
                
                animate={{ x: [1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2 }}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Helmet>
                      <title>{ product.name}</title>
                    </Helmet>
                    <h1>{ product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating rating={product.rating}
                    numReviews={product.numReviews} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    price : ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                  </ListGroup>
                  </motion.div>
              </Col>
              <Col ms={3}>
                <motion.div
                
                animate={{ x: [1000, 0, 0] ,y: 0 }}
                transition={{ type: "spring", duration: 2.5 }}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ?
                            <Badge bg='success'>In Stock</Badge>
                            :
                            <Badge bg='danger'>Out of Stock</Badge>
                        }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 &&
                      <ListGroup.Item>
                        <div className='d-grid'>
                          <Button className='primary' onClick={addToCartHandler}>
                            Add to Card
                          </Button>
                        </div>
                      </ListGroup.Item>
                        }
                    </ListGroup>
                    
                  </Card>
                  </motion.div>
              </Col>
            </Row>
          </div>
      }
    </div>
  )
}

export default ProductScreen