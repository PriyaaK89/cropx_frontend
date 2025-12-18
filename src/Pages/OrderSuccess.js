import { Box, Text, Button, VStack, useDisclosure } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import TopNavbar from "../components/Home/Navbar";
import OrderInvoiceModal from "../components/OrderPaymentInvoice/OrderInvoiceModal";
import axios from "axios";
import { Config } from "../components/Utils/Config";
import { useEffect, useState } from "react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [orderDetails, setOrderDetails] = useState({});
  console.log(orderId, "orderId at success")

  const getOrderDetailsById = async()=>{
    try{
        const response = await axios.get(`${Config?.order_details_by_id}/${orderId}`)
        if(response?.status === 200){
             setOrderDetails(response?.data?.order)
        }
    }catch(error){
        console.log(error, "Error in fetching API response.")
    }
  }

  useEffect(()=>{
    
        getOrderDetailsById();
    
  },[orderId])

  return (
    <>
    <OrderInvoiceModal isOpen={isOpen} onClose={onClose} order={orderDetails}/>
    <TopNavbar/>
    <Box textAlign="center" mt="50px">
      <VStack spacing={4}>
        <Text fontSize="32px" fontWeight="bold" color="green.500">
           Order Placed Successfully!
        </Text>
  <Button colorScheme="blue" onClick={onOpen}>
          View Invoice
        </Button>
        <Text fontSize="18px">
          Your order ID is: <b>{orderId}</b>
        </Text>

        <Link to={`/track-order/${orderId}`}>
          <Button colorScheme="green">Track Your Order</Button>
        </Link>

        <Link to="/">
          <Button variant="outline" colorScheme="green">
            Continue Shopping
          </Button>
        </Link>
      </VStack>
    </Box>
    </>
  );
};

export default OrderSuccess;
