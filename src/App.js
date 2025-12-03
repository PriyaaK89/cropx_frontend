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

function App() {
  return (
    <>
    <ChakraProvider>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/distributor-request' element={<DistributorFormPage/>}/>
        <Route path='/product-details/:id' element={<ProductDetailsPage/>}/>
        <Route path='/product-details/:id' element={<ProductDetailsPage/>}/>

        </Routes>
      </Router>
    </ChakraProvider>
    </>
  );
}

export default App;
