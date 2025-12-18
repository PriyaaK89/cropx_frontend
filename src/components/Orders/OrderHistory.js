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
  useToast,
  HStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Config } from "../Utils/Config";
import { useNavigate } from "react-router-dom";
import StarRating from "./RateProduct";
import moment from "moment/moment";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;
  const authToken = user?.token;
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const toast = useToast();

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(`${Config.get_order_history}/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status === 200) {
        setOrderList(res.data.orders);

        //  Initialize ratings from backend
        const initialRatings = {};

        res.data.orders.forEach((order) => {
          order.products.forEach((product) => {
            // Single packs
            product.single_packs.forEach((item) => {
              if (item.user_rating != null) {
                initialRatings[
                  `variant_${product.product_id}_${item.variant_id}`
                ] = item.user_rating;
              }
            });

            // Multi packs
            product.multi_packs.forEach((item) => {
              if (item.user_rating != null) {
                initialRatings[
                  `multipack_${product.product_id}_${item.multipack_id}`
                ] = item.user_rating;
              }
            });
          });
        });

        setRatings(initialRatings);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (userId) fetchUserOrders();
  }, [userId]);

  const handleRatingChange = async ({
    key,
    value,
    product_id,
    variant_id = null,
    multipack_id = null,
  }) => {
    // Optimistic UI update
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));

    try {
      await axios.post(
        Config.rate_product,
        {
          product_id,
          variant_id,
          multipack_id,
          rating: value,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      toast({
        description: "Thanks for rating ⭐",
        duration: 1500,
        status: "success",
      });
    } catch (error) {
      console.error("Rating failed", error);
    }
  };

  return (
    <Box maxW="1000px" mx="auto" p={{ base: 3, md: 6 }}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        My Orders
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

            <Stack direction="column" spacing={2}>
              <HStack>
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
              </HStack>
              {order.order_status === "DELIVERED" ? (
                <HStack>
                  <Text fontSize="sm" color="gray.500">
                    Delivered at
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {" "}
                    {order?.delivered_at
                      ? moment(order.delivered_at).format("DD/MM/YYYY")
                      : "-"}
                  </Text>
                </HStack>
              ) : (
                ""
              )}
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
                        <Box>
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
                                {item.quantity_type} ({"Pack of "}{" "}
                                {item.cart_quantity}){" "}
                              </Text>
                              <Text color="gray.500" fontSize="xs">
                                {" "}
                                {"You saved "}
                                {parseFloat(item.discount_percent)}%{" "}
                              </Text>
                            </Box>
                            <Box>
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
                            </Box>
                          </Flex>
                          {order.order_status === "DELIVERED" && (
                            <Box mt={2}>
                              <Text fontSize="xs">Rate this product</Text>

                              <Flex align="center" gap={3}>
                                <StarRating
                                  value={
                                    ratings[
                                      `variant_${product.product_id}_${item.variant_id}`
                                    ] ?? 0
                                  }
                                  onChange={(value) =>
                                    handleRatingChange({
                                      key: `variant_${product.product_id}_${item.variant_id}`,
                                      value,
                                      product_id: product.product_id,
                                      variant_id: item.variant_id,
                                    })
                                  }
                                />
                              </Flex>
                            </Box>
                          )}
                        </Box>
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
                        <Box>
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
                                ₹{item.actual_price}
                              </Text>
                              <Text fontWeight="bold" color="green.700">
                                {" "}
                                ₹{item.total_price}{" "}
                              </Text>
                            </Flex>
                          </Flex>
                          {order.order_status === "DELIVERED" && (
                            <Box mt={2}>
                              <Text fontSize="xs" >
                                Rate this combo
                              </Text>

                              <Flex align="center" gap={3}>
                                <StarRating
                                  value={ ratings[`multipack_${product.product_id}_${item.multipack_id}`] ?? 0}
                                  onChange={(value) => handleRatingChange({
                                      key: `multipack_${product.product_id}_${item.multipack_id}`,
                                      value,
                                      product_id: product.product_id,
                                      multipack_id: item.multipack_id,
                                    })}/>
                              </Flex>
                            </Box>
                          )}
                        </Box>
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

              <Button size="sm" mt={2} colorScheme="blue" variant="outline"
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
