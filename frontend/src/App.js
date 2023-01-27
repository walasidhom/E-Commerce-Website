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
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
function App() {
  
  
  return (
    <BrowserRouter>
      <div className='site-container d-flex flex-column'>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
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
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/profile" element={<PrivateRoute />} >
                <Route exact path='/profile' element={<ProfileScreen/>}/>
              </Route>
              
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
