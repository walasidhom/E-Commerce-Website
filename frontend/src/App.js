import './App.css';
import {  Container} from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavigationBar from './components/NavigationBar';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddress from './screens/ShippingAddress';

function App() {
  
  
  return (
    <BrowserRouter>
      <div className='site-container d-flex flex-column'>
        <header>
          <ToastContainer position="bottom-center" limit={1} />
          <NavigationBar />
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} /> 
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/cart/:id" element={<CartScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/shipping' element={<ShippingAddress />} />
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
