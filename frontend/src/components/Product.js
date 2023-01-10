import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../screens/Store';
import Rating from './Rating';


const Product = ({ product }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const AddToCartHandler = (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  }
    
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} className='card-img-top'/>
          </Link>
          <Card.Body>
            <Link to={`/product/${product.slug}`} >
                <Card.Title>{product.name}</Card.Title>
              </Link>
              <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? <Button variant='light' disabled>out of Stock</Button>
        : <Button className='primary' onClick={()=>AddToCartHandler(product)}>Add to Card</Button>}
            
          </Card.Body>
          
        
    </Card>
  )
}

export default Product