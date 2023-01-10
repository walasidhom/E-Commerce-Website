import './App.css';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { Store } from './screens/Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
function App() {
  const { state } = useContext(Store);
  // destructuring state
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>
                  <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    style=
                    {{
                      width: '90px',
                      height: '30px',
                      marginTop: '10px'
                    }}
                    alt='amazona'/>
                </Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                
                  <FontAwesomeIcon icon={faShoppingCart} className='icon' size='xl' />

                <Link to='/Cart' className="nav-link" title='Cart'>
                  
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ fontSize: 8 }}>
                      {cart.cartItems.reduce( (a,c)=> a+c.quantity, 0)}</Badge>
                  )}
                </Link>
                
                                  
                </Nav>
            </Container>
            
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />} /> {/* slug is a parameter */}
              <Route path='/cart' element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
            </Routes>
          </Container>
          
          
        </main>
        <footer>
          <div className='text-center'>@All rights reserved</div>
        </footer>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
