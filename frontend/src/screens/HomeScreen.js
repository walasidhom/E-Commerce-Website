import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { motion } from "framer-motion";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false , products:action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false ,  error : action.payload};
    default:
      return state;
  }
}


const HomeScreen = () => {

//defining a reducer for fetching data from the backend:
  const [{loading , error , products}, dispatch] = useReducer(logger(reducer), {loading:true , error:'' , products:[]})

    //const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          //if i success to fetch data
          const result = await axios.get('/api/products');
          dispatch({ type: 'FETCH_SUCCESS' , payload:result.data });
        } catch (error) {
          // if i fail fetching data
          dispatch({ type: 'FETCH_FAIL' , payload:error.message });
        }
            
            
        };
        fetchData();
    }, [])
    
  return (
    
    <div>
      <motion.h1
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            whileHover={{ scale: 1.1 }}>
                Features Products
        </motion.h1>
          
        <motion.div
                initial={{ y: 2000 }}
                animate={{ y: 10 }}
                transition={{ type: "spring", duration: 1 }} className='products'>
        {
          loading ? <LoadingBox /> :
            error ? <MessageBox variant='danger'>{error}</MessageBox> :
              <Row>
                {products.map((product) => {
                  return (
                    <Col
                      sm={6} md={4} lg={3} className='mb-3' key={product._id}>
                      <Product product={product} />
                    </Col>
                    
                  )
              
                })}
              </Row>
            
          }
        </motion.div>
    </div>
  )
}

export default HomeScreen