import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Image,
  Text,
  Flex,
  HStack,
  useToast,
  useDisclosure,
  Img,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Config } from "../Utils/Config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LoginModal from "../Models/LoginModal";
import emptyCartImg from "../../images/emptyCart.jpg";
import { HiReceiptPercent } from "react-icons/hi2";
import UnlockBar from "./UnlockBar";
import { BsCart3 } from "react-icons/bs";

const CartDrawer = ({ isCartDrawerOpen, onCartDrawerClose }) => {
  const { cartData, getCartItems, cartItems, priceSummary } =
    useContext(CartContext);
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  console.log(cartData, "cartData");
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;
  console.log(priceSummary, "PriceSummary");

  const [showFreeDeliveryBar, setShowFreeDeliveryBar] = useState(false);
  const [showUnlockedBar, setShowUnlockedBar] = useState(false);

  const FREE_DELIVERY_LIMIT = 500;

  const grandTotal = Number(priceSummary?.grand_total || 0);

  const remainingAmount = Math.max(FREE_DELIVERY_LIMIT - grandTotal, 0);

  const progressPercent = Math.min(
    (grandTotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  useEffect(() => {
    if (grandTotal >= FREE_DELIVERY_LIMIT) {
      setShowUnlockedBar(true);
      setShowFreeDeliveryBar(false);

      const timer = setTimeout(() => {
        setShowUnlockedBar(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowFreeDeliveryBar(true);
      setShowUnlockedBar(false);
    }
  }, [grandTotal]);

  const handleIncrease = async ({ product_id, variant_id, multipack_id }) => {
    const key = multipack_id ? multipack_id : variant_id;
    if (!userId) {
      toast({
        description: "Please login first to add items to cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onLoginModalOpen();
      return;
    }
    try {
      const payload = {
        user_id: userId,
        product_id: product_id,
        quantity: 1,
        variant_id: variant_id || null,
        multipack_id: multipack_id || null,
      };

      const response = await axios.post(Config.Add_to_cart, payload);

      if (response.status === 200) {
        // setQuantities((prev) => ({
        //   ...prev,
        //   [key]: (prev[key] || 0) + 1,
        // }));
        await getCartItems();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDecrease = async ({ product_id, variant_id, multipack_id }) => {
    const key = multipack_id ? multipack_id : variant_id;
    try {
      const response = await axios.post(Config.decrease_item, {
        user_id: userId,
        product_id: product_id,
        variant_id,
        multipack_id,
      });

      if (response.status === 200) {
        // setQuantities((prev) => ({
        //   ...prev,
        //   [key]: (prev[key] || 0) - 1,
        // }));
        await getCartItems();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveProduct = async (cart_item_id) => {
    try {
      const response = await axios.post(`${Config?.remove_cart_item}`, {
        cart_id: cart_item_id,
      });
      if (response?.status === 200) {
        toast({
          description: "Item removed from cart",
          duration: 2000,
          isClosable: true,
          status: "success",
        });
        getCartItems();
      }
    } catch (error) {
      console.log(error, "Error in fetching API response.");
    }
  };

  return (
    <>
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        onLoginModalClose={onLoginModalClose}
      />
      <Drawer isOpen={isCartDrawerOpen} onClose={onCartDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            top="6px"
            right="4px"
            _hover={{ bg: "transparent" }}
          />
          <DrawerHeader
            fontSize="16px"
            color="#4d4d4d"
            padding="10px 20px"
            bg="#d8efd6"
            fontWeight="500">
            <HStack>
              {" "}
              <BsCart3 /> <Text> Cart </Text> <Text>({cartItems} Items)</Text>{" "}
            </HStack>
          </DrawerHeader>
          <DrawerBody padding="0px" position="relative">
            <UnlockBar showUnlockedBar={showUnlockedBar} />
            {cartData?.length === 0 ? (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  height="100%">
                  <Img src={emptyCartImg} alt="empty cart" width="190px" />
                  <Text my={6}>No Items added to cart.</Text>
                  <Button
                    bg="green"
                    color="white"
                    fontSize="14px"
                    fontWeight="500"
                    _hover={{ background: "green.600" }}
                    onClick={onCartDrawerClose}>
                    Continue Shopping
                  </Button>
                </Box>
              </>
            ) : (
              <>
               {showFreeDeliveryBar && remainingAmount > 0 && (
                    <Box bg="#f4f0ff" borderRadius="6px" p={3} mb={3}>
                      <HStack spacing={2}>
                        <Box
                          bg="orange.400"
                          color="white"
                          px={2}
                          py={1}
                          borderRadius="4px">
                          🔒
                        </Box>

                        <Text fontSize="14px" fontWeight="500" color="#6b46c1">
                          You're ₹{remainingAmount.toFixed(2)} away from Free
                          Delivery!
                        </Text>
                      </HStack>

                      {/* Progress Bar */}
                      <Box mt={2} bg="gray.200" h="4px">
                        <Box
                          bg="#6b46c1"
                          h="4px"
                          borderRadius="full"
                          width={`${progressPercent}%`}
                        />
                      </Box>
                    </Box>
                  )}
                {   cartData.map((product) => (
                <Box key={product.product_id} mb={5}>
                 

                  <Box>
                    <Box>
                    {product.single_packs.map((sp) => {
                      return (
                        <>
                          {/* FREE DELIVERY INFO BAR */}

                          <Flex
                            key={sp.variant_id}
                            p={4}
                            borderBottom="1px solid #e5e5e5"
                            gap={4}
                            align="flex-start">
                            <Image
                              src={product.product_img}
                              alt={product.product_name}
                              boxSize="70px"
                              objectFit="contain"
                            />

                            {/* Right Section */}
                            <Box flex="1">
                              <Text fontSize="16px" fontWeight="600">
                                {" "}
                                {product.product_name}{" "}
                              </Text>
                              <Text fontSize="14px" color="gray.500">
                                {" "}
                                {product.product_category}
                              </Text>

                              <Text fontSize="14px" mt={1}>
                                Size{" "}
                                <b>
                                  {sp.quantity_value + " " + sp.quantity_type}
                                </b>
                              </Text>

                              {/* Price Section */}
                              <HStack spacing={2} mt={1}>
                                <Text fontSize="16px" fontWeight="bold">
                                  {" "}
                                  ₹{sp.discounted_price}{" "}
                                </Text>
                                <Text fontSize="14px" color="gray.500" as="s">
                                  {" "}
                                  ₹{sp.actual_price}{" "}
                                </Text>
                              </HStack>

                              {/* Qty & Remove */}
                              <HStack mt={3}>
                                {/* Quantity Box */}
                                <Flex
                                  border="1px solid #ccc"
                                  borderRadius="md"
                                  overflow="hidden"
                                  align="center"
                                  height="33px">
                                  {/* DELETE IF QTY = 1 ELSE MINUS */}
                                  {sp.cart_quantity === 1 ? (
                                    <Button
                                      onClick={() =>
                                        handleRemoveProduct(sp.cart_item_id)
                                      }
                                      bg="white"
                                      color="red.500"
                                      fontSize="18px"
                                      px={4}>
                                      🗑
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDecrease({
                                          product_id: product?.product_id,
                                          variant_id: sp.variant_id,
                                          multipack_id: sp.multipack_id,
                                        })
                                      }
                                      bg="white"
                                      color="red.500"
                                      fontSize="20px"
                                      px={4}>
                                      {" "}
                                      -{" "}
                                    </Button>
                                  )}

                                  {/* Quantity */}
                                  <Box
                                    bg="green.500"
                                    color="white"
                                    px={4}
                                    py={1}
                                    fontWeight="bold">
                                    {" "}
                                    {sp.cart_quantity}{" "}
                                  </Box>

                                  {/* Increase */}
                                  <Button
                                    onClick={() =>
                                      handleIncrease({
                                        product_id: product?.product_id,
                                        variant_id: sp.variant_id,
                                        multipack_id: sp.multipack_id,
                                      })
                                    }
                                    bg="white"
                                    color="green.600"
                                    fontSize="20px"
                                    px={4}>
                                    +
                                  </Button>
                                </Flex>

                                {/* Remove Button */}
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  onClick={() =>
                                    handleRemoveProduct(sp.cart_item_id)
                                  }>
                                  {" "}
                                  Remove{" "}
                                </Button>
                              </HStack>
                            </Box>
                          </Flex>
                        </>
                      );
                    })}
</Box>               
<Box>
                    {product.multi_packs.map((mp) => {
                      const key = mp.multipack_id;
                      return (
                        <>
                          <Flex
                            key={mp.multipack_id}
                            p={4}
                            borderBottom="1px solid #e5e5e5"
                            gap={4}
                            align="flex-start">

                            <Image
                              src={product.product_img}
                              alt={product.product_name}
                              boxSize="70px"
                              objectFit="contain"
                            />

                            <Box flex="1">
                              <Text fontSize="16px" fontWeight="600">
                                {" "}
                                {product.product_name}{" "}
                              </Text>
                              <Text fontSize="14px" color="gray.500">
                                {" "}
                                {product.product_category}{" "}
                              </Text>
                              <Text fontSize="14px" mt={1}>
                                Size{" "}
                                <b>
                                  {mp.total_quantity_value} {mp.quantity_type} (
                                  {mp.base_quantity}
                                  {mp.quantity_type}
                                  <RxCross2
                                    style={{
                                      display: "inline",
                                      margin: "0 5px",
                                    }}
                                  />
                                  {mp.pack_quantity})
                                </b>
                              </Text>

                              <HStack spacing={2} mt={1}>
                                <Text fontSize="16px" fontWeight="bold">
                                  {" "}
                                  ₹{mp.discounted_price}{" "}
                                </Text>
                                <Text fontSize="14px" color="gray.500" as="s">
                                  {" "}
                                  ₹{mp.actual_price}{" "}
                                </Text>
                              </HStack>

                              <HStack mt={3}>
                                <Flex
                                  height="33px"
                                  border="1px solid #ddd"
                                  rounded="lg"
                                  overflow="hidden"
                                  align="center">
                                  {mp.cart_quantity === 1 ? (
                                    <Button
                                      onClick={() =>
                                        handleDecrease({
                                          product_id: product?.product_id,
                                          variant_id: mp.variant_id,
                                          multipack_id: mp.multipack_id,
                                        })
                                      }
                                      bg="white"
                                      color="red.500"
                                      fontSize="18px"
                                      px={4}>
                                      🗑
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDecrease({
                                          product_id: product?.product_id,
                                          variant_id: mp.variant_id,
                                          multipack_id: mp.multipack_id,
                                        })
                                      }
                                      bg="white"
                                      color="red.500"
                                      fontSize="20px"
                                      px={4}>
                                      -
                                    </Button>
                                  )}

                                  <Box
                                    bg="green.600"
                                    color="white"
                                    px={6}
                                    py={1}
                                    fontWeight="bold">
                                    {mp.cart_quantity}
                                  </Box>

                                  <Button
                                    onClick={() =>
                                      handleIncrease({
                                        product_id: product?.product_id,
                                        variant_id: mp.variant_id,
                                        multipack_id: mp.multipack_id,
                                      })
                                    }
                                    bg="white"
                                    color="green.600"
                                    fontSize="20px"
                                    px={4}>
                                    +
                                  </Button>
                                </Flex>

                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  onClick={() =>
                                    handleRemoveProduct(mp.cart_item_id)
                                  }>
                                  {" "}
                                  Remove{" "}
                                </Button>
                              </HStack>
                            </Box>
                          </Flex>
                        </>
                      );
                    })}</Box></Box>
                  
                  
                </Box>
              ))}
              </>
             
            )}
              <VStack width="96%" mb="4px" position={{base:"absolute", md:"initial"}} bottom={{base:"7px"}}>
                      <HStack
                        padding="4px 10px"
                        background="linear-gradient(46deg, #e6f7e4, transparent)"
                        borderRadius="5px"
                        margin="0px 0px"
                        width={{base:"95%",md:"95%"}}>
                        <HiReceiptPercent fill="#4b9451" fontSize="19px" />
                        <Text
                          fontSize="13px"
                          fontFamily="Inter-SemiBold"
                          color="green">
                          Pay online & save 2% or more instantly.
                        </Text>
                      </HStack>
                      <VStack alignItems="baseline" gap="4px" width={{ base:"93%", lg:"96%"}} >
                        <Text fontFamily="Inter-Medium" fontSize="14px">
                          Billing Details
                        </Text>
                        <HStack
                          justifyContent="space-between"
                          width="-webkit-fill-available"
                          fontSize="14px">
                          <Text>Total Price</Text>{" "}
                          <Text>{Number(priceSummary?.subtotal).toFixed(2)}</Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          width="-webkit-fill-available"
                          fontSize="14px">
                          <Text>Shipping Charges</Text>{" "}
                          <Text>{priceSummary?.delivery_fee}</Text>
                        </HStack>
                      </VStack>
                    </VStack>
          </DrawerBody>

          {cartData?.length !== 0 && (
            <DrawerFooter p={0}>
              <HStack
                width="100%"
                justifyContent="space-between"
                py={4}
                px={6}
                boxShadow="3px 1px 3px #d9d9d9">
                <VStack gap="0px" alignItems="start">
                  <Text fontSize="18px" fontFamily="Inter-SemiBold">
                    ₹{Number(priceSummary?.grand_total).toFixed(2)}
                  </Text>
                  <Text fontSize="14px" color="gray.600" lineHeight="14px">
                    Net Price
                  </Text>
                </VStack>
                <Button
                  // colorScheme="blue"
                  color="white"
                  bg="#419837"
                  _hover={{ bg: "#2f7128" }}
                  w="30%"
                  fontWeight="500"
                  padding="5px 20px"
                  onClick={() => navigate("/save-address")}>
                  Proceed
                </Button>
              </HStack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
