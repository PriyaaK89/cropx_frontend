import {
  Box,
  Text,
  Flex,
  Image,
  Badge,
  Divider,
  Stack,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Config } from "../Utils/Config";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;
  const navigate = useNavigate();

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(`${Config.get_order_history}/${userId}`);
      if (res.status === 200) {
        setOrderList(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserOrders();
  }, [userId]);

  return (
    <Box maxW="1000px" mx="auto" p={{ base: 3, md: 6 }}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        {" "}
        My Orders{" "}
      </Text>

      {orderList.map((order) => (
        <Box
          key={order.order_id}
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
          p={5}
          mb={6}>
          {/* ORDER HEADER */}
          <Flex justify="space-between" align="flex-start" wrap="wrap" mb={4}>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {" "}
                Order #{order.order_id}{" "}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </Text>
            </Box>

            <Stack direction="row" spacing={2}>
              <Badge px={3} py={1} borderRadius="full" colorScheme="blue">
                {" "}
                {order.order_status}{" "}
              </Badge>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme={
                  order.payment_status === "PAID" ? "green" : "orange"
                }>
                {order.payment_status}
              </Badge>
            </Stack>
          </Flex>

          <Divider mb={4} />

          {/* PRODUCTS */}
          <VStack align="stretch" spacing={6}>
            {order.products.map((product) => (
              <Box
                key={product.product_id}
                display="flex"
                gap={4}
                justifyContent="left">
                {/* PRODUCT INFO */}
                <Flex gap={4} align="center" mb={3} width="250px">
                  <Image
                    src={product.product_img}
                    boxSize="80px"
                    objectFit="contain"
                    borderRadius="lg"
                    bg="gray.50"
                  />
                  <Box>
                    <Text fontWeight="semibold">{product.product_name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {" "}
                      {product.product_category}{" "}
                    </Text>
                  </Box>
                </Flex>

                <Box width="360px">
                  {product.single_packs.length > 0 && (
                    <Box bg="gray.50" borderRadius="lg" p={4} mb={3}>
                      <Text fontSize="sm" fontWeight="bold" mb={3}>
                        {" "}
                        Single Pack{" "}
                      </Text>

                      {product.single_packs.map((item) => (
                        <Flex
                          key={item.cart_item_id}
                          justify="space-between"
                          fontSize="sm"
                          mb={2}
                          gap={4}>
                          <Box>
                            <Text>
                              {" "}
                              {parseFloat(item.quantity_value)}{" "}
                              {item.quantity_type} ({"Pack of "}
                              {item.cart_quantity}){" "}
                            </Text>
                            <Text color="gray.500" fontSize="xs">
                              {" "}
                              {"You saved "}
                              {parseFloat(item.discount_percent)}%{" "}
                            </Text>
                          </Box>

                          <Flex gap={2}>
                            <Text
                              color="gray.500"
                              textDecoration="line-through"
                              fontSize="12px">
                              ₹{item.actual_price}
                            </Text>
                            <Text fontWeight="semibold">
                              ₹{item.total_price}
                            </Text>
                          </Flex>
                        </Flex>
                      ))}
                    </Box>
                  )}
                </Box>
                <Box width="360px">
                  {product.multi_packs.length > 0 && (
                    <Box bg="green.50" borderRadius="lg" p={4}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="green.700"
                        mb={3}>
                        Combo Pack Offer
                      </Text>

                      {product.multi_packs.map((item) => (
                        <Flex
                          key={item.cart_item_id}
                          justify="space-between"
                          fontSize="sm"
                          mb={2}
                          gap={4}>
                          <Box>
                            <Text>
                              {parseFloat(item.total_quantity_value)}
                              {item.quantity_type} ( Pack of{" "}
                              {item.pack_quantity})
                            </Text>
                            <Text fontSize="xs" color="green.600">
                              {" "}
                              You save {item.discount_percentage}%{" "}
                            </Text>
                          </Box>

                          <Flex gap={2}>
                            <Text
                              color="gray.500"
                              textDecoration="line-through"
                              fontSize="12px">
                              {" "}
                              ₹{item.actual_price}{" "}
                            </Text>
                            <Text fontWeight="bold" color="green.700">
                              {" "}
                              ₹{item.total_price}{" "}
                            </Text>
                          </Flex>
                        </Flex>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </VStack>

          <Divider my={4} />

          {/* FOOTER */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Deliver to: {order.address.name}, {order.address.city},{" "}
                {order.address.state}
              </Text>

              <Button
                size="sm"
                mt={2}
                colorScheme="blue"
                variant="outline"
                onClick={() => navigate(`/track-order/${order.order_id}`)}>
                Track Order
              </Button>
            </Box>

            <Text fontSize="xl" fontWeight="bold">
              ₹{order.total_amount}
            </Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
