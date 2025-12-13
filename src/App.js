import logo from './logo.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import CheckoutPage from './Pages/CheckoutPage';
import DistributorFormPage from './Pages/DistributorAccessForm';
import SignupPage from './Pages/SignUp';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import AuthProvider from './components/Context/AuthContext';
import CartProvider from './components/Context/CartContext';
import ProductsByCategory from './components/ProductCategory/ProductsbyCategory';
import PaymentPage from './Pages/Payment';
import AddressChecker from './components/Checkout/AddressChecker';
import OrderSuccess from './Pages/OrderSuccess';


function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/distributor-request' element={<DistributorFormPage />} />
                <Route path='/product-details/:id' element={<ProductDetailsPage />} />
                <Route path='/product-by-categories/:id' element={<ProductsByCategory />} />
                {/* <Route path='/save-address' element={<CheckoutPage />} /> */}
                <Route path="/save-address" element={<AddressChecker userId={4}> <CheckoutPage /> </AddressChecker> }/>
                <Route path='/checkout/payment-mode' element={<PaymentPage />} />
                <Route path='/order-success/:orderId' element={<OrderSuccess/>}/>
              </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
