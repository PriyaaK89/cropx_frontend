import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import DistributorFormPage from './Pages/DistributorAccessForm';
import SignupPage from './Pages/SignUp';

function App() {
  return (
    <>
    <ChakraProvider>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/distributor-request' element={<DistributorFormPage/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
    </>
  );
}

export default App;
