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
import PaymentPage from './Pages/Payment';
import AddressChecker from './components/Checkout/AddressChecker';
import OrderSuccess from './Pages/OrderSuccess';
import OrdersHistoryPage from './Pages/OrderHistoryPage';
import TrackOrders from './components/Orders/TrackOrder';
import ProductByCategoriesPage from './Pages/ProductsByCategories';
import ProductByHomeCategories from './components/Products/ProductsByHome';
import ProductListing from './components/Products/ProductListing';
import AboutUs from './components/AboutUs/About';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfServices';
import FAQ from './Pages/FAQ';
import ScrollToTop from './components/Utils/ScrollToTop';
import ReturnRefundPolicy from './Pages/ReturnRefundPolicy';
import ShippingDeliveryInfo from './Pages/DeliveryPolicy';


function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <ScrollToTop/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/distributor-request' element={<DistributorFormPage />} />
                <Route path='/product-details/:id' element={<ProductDetailsPage />} />
                <Route path='/products/:level/:id' element={<ProductByCategoriesPage/>} />
                {/* <Route path='/save-address' element={<CheckoutPage />} /> */}
                <Route path="/save-address" element={<AddressChecker userId={4}> <CheckoutPage /> </AddressChecker> }/>
                <Route path='/checkout/payment-mode' element={<PaymentPage />} />
                <Route path='/order-success/:orderId' element={<OrderSuccess/>}/>
                <Route path='/order-history' element={<OrdersHistoryPage/>}/>
                <Route path='/track-order/:orderId' element={<TrackOrders/>}/>
                <Route path='/product-by-categories/:categoryId' element={<ProductByHomeCategories/>}/>
                <Route path="/products/:type" element={<ProductListing />} />
                <Route path='/pages/about-us' element={<AboutUs/>}/>
                <Route path='/pages/privacy-policy' element={<PrivacyPolicy/>}/>
                <Route path='/pages/terms-of-services' element={<TermsOfService/>}/>
                <Route path='/pages/faq' element={<FAQ/>}/>
                <Route path='/pages/refund-policy' element={<ReturnRefundPolicy/>}/>
                <Route path='/pages/delivery-policy' element={<ShippingDeliveryInfo/>}/>
              </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
