import { Box, Text, Flex, Image, Badge, Divider, VStack, HStack, Avatar,} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../Utils/Config";
import { useParams } from "react-router-dom";
import TopNavbar from "../Home/Navbar";
import TrackingStepper from "./OrderTrackingStepper";


const TrackOrders = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`${Config?.order_details_by_id}/${orderId}`);
      if (res.status === 200) {
        setOrderDetails(res.data.order);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (!orderDetails) return <Text>Loading...</Text>;

  const { order_details, order_items } = orderDetails;
  const order_Status = order_details?.order_status


  return (
    <>
    <TopNavbar/>
    <Flex  p={6} gap={6} bg="#f7f7f7">
      {/* LEFT PANEL */}
      <VStack
        w="30%"
        bg="white"
        p={5}
        borderRadius="lg"
        spacing={6}
        align="stretch">
        {/* USER INFO */}
        <HStack>
          <Avatar name={order_details.name} />
          <Box>
            <Text fontWeight="bold">{order_details.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {order_details.email}
            </Text>
          </Box>
        </HStack>

        <Divider />

        {/* PAYMENT */}
        <Box>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Payment Method</Text>

          </Flex>
          <Text mt={2} fontSize="sm">
            {order_details.payment_method}
          </Text>
        </Box>

        <Divider />

        {/* SHIPPING */}
        <Box>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Shipping Address</Text>

          </Flex>
          <Text fontSize="sm" mt={2}>
            {order_details.street_name}, {order_details.city}
          </Text>
          <Text fontSize="sm">
            {order_details.state} - {order_details.pincode}
          </Text>
        </Box>

        <Divider />

        {/* BILLING */}
        <Box>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Billing Address</Text>
          </Flex>
          <Text fontSize="sm" mt={2}>
            Same as shipping address
          </Text>
        </Box>
      </VStack>

      {/* RIGHT PANEL */}
      <Box w="70%" bg="white" p={6} borderRadius="lg">
        {/* ORDER HEADER */}
        <Text fontWeight="bold" fontSize="lg">
          Order ID : {order_details.order_id}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Thank you. Your order has been confirmed.
        </Text>

        {/* STEPS */}
        <HStack spacing={6} mb={6}>
          <TrackingStepper order_Status={order_Status}/>
        </HStack>

        {/* PRODUCT LIST */}
        <Text fontWeight="bold" mb={3}>
          Product Listing
        </Text>

        <VStack spacing={4} align="stretch">
          {order_items.map((item) => {
            const isMultipack = item.multipack_id !== null;

            return (
              <Flex
                key={item.order_item_id}
                p={4}
                bg="#fafafa"
                borderRadius="md"
                justify="space-between"
                align="center">
                {/* LEFT */}
                <HStack spacing={4} align="flex-start">
                  <Image
                    src={item.product_img}
                    boxSize="60px"
                    objectFit="contain"
                  />

                  <Box>
                    <Text fontWeight="semibold">{item.product_name}</Text>

                    {/* PACK TYPE BADGE */}
                    <Badge
                      mt={1}
                      colorScheme={isMultipack ? "purple" : "green"}>
                      {isMultipack ? "Multipack" : "Single Pack"}
                    </Badge>

                    {/* PACK DETAILS */}
                    {isMultipack ? (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        {item.mp_pack_quantity} × {item.v_quantity_value}
                        {item.v_quantity_type} = {item.mp_total_quantity_value}
                        {item.mp_quantity_type}
                      </Text>
                    ) : (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        {item.v_quantity_value}
                        {item.v_quantity_type}
                      </Text>
                    )}

                    {/* ORDER QUANTITY */}
                    <Text fontSize="sm" color="gray.500">
                      Qty: {item.order_quantity}
                    </Text>
                  </Box>
                </HStack>

                {/* RIGHT */}
                <Box textAlign="end">
                  <Text fontWeight="semibold">
                    ₹{Number(item.item_total_price)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    MRP ₹
                    {isMultipack
                      ? parseFloat(item.mp_actual_price)
                      : parseFloat(item.v_actual_price)}{" "}
                    • Saved{" "}
                    {isMultipack
                      ? parseFloat(item.mp_discount_percentage)
                      : parseFloat(item.v_discount_percent)}
                    %
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </VStack>

        {/* TOTAL */}
        <Box mt={6}>
          <Divider mb={3} />
          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>₹{order_details.subtotal}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Shipping Charge</Text>
            <Text>₹{order_details.delivery_fee}</Text>
          </Flex>
          <Divider my={2} />
          <Flex justify="space-between" fontWeight="bold" fontSize="lg">
            <Text>Total</Text>
            <Text>₹{order_details.total_amount}</Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
    </>
  );
};

export default TrackOrders;
