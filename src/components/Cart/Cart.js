import {
  Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Box, Image, Text, Flex, IconButton, HStack, useToast, useDisclosure, Img,} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Config } from "../Utils/Config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LoginModal from "../Models/LoginModal";
import emptyCartImg from "../../images/emptyCart.jpg"

const CartDrawer = ({ isCartDrawerOpen, onCartDrawerClose }) => {
  const { cartData, getCartItems } = useContext(CartContext);
  // const [quantities, setQuantities] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
  console.log(cartData, "cartData");
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;

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
      <LoginModal isLoginModalOpen={isLoginModalOpen} onLoginModalClose={onLoginModalClose} />
      <Drawer isOpen={isCartDrawerOpen} onClose={onCartDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {cartData?.length === 0 ? ( 
              <>
              <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <Img src={emptyCartImg} alt="empty cart" width='280px'/>
                <Text my={6}>No Items added to cart.</Text>
                <Button bg="green" color="white" fontSize="14px" fontWeight="500" _hover={{ background: 'green.600' }} onClick={onCartDrawerClose}>Continue Shopping</Button>
              </Box>
              </>
             ) : (
              cartData.map((product) => (
                <Box key={product.product_id} mb={5}>
                  {product.single_packs.map((sp) => (
                    <Flex key={sp.variant_id} p={4}
                      borderBottom="1px solid #e5e5e5" gap={4} align="flex-start">
                      <Image src={product.product_img} alt={product.product_name} boxSize="70px" objectFit="contain" />

                      {/* Right Section */}
                      <Box flex="1">
                        <Text fontSize="16px" fontWeight="600"> {product.product_name} </Text>
                        <Text fontSize="14px" color="gray.500"> {product.product_category}</Text>

                        <Text fontSize="14px" mt={1}>
                          Size{" "} <b>{sp.quantity_value + " " + sp.quantity_type}</b>
                        </Text>

                        {/* Price Section */}
                        <HStack spacing={2} mt={1}>
                          <Text fontSize="16px" fontWeight="bold"> ₹{sp.discounted_price} </Text>
                          <Text fontSize="14px" color="gray.500" as="s"> ₹{sp.actual_price} </Text>
                        </HStack>

                        {/* Qty & Remove */}
                        <HStack mt={3}>
                          {/* Quantity Box */}
                          <Flex border="1px solid #ccc" borderRadius="md" overflow="hidden" align="center" height="33px">

                            {/* DELETE IF QTY = 1 ELSE MINUS */}
                            {sp.cart_quantity === 1 ? (
                              <Button
                                onClick={() =>handleRemoveProduct(sp.cart_item_id)}
                                bg="white" color="red.500" fontSize="18px" px={4} >
                                🗑
                              </Button>
                            ) : (
                              <Button onClick={() => handleDecrease({ product_id: product?.product_id, variant_id: sp.variant_id, multipack_id: sp.multipack_id})} bg="white" color="red.500" fontSize="20px" px={4}> - </Button>)}

                            {/* Quantity */}
                            <Box bg="green.500" color="white" px={4} py={1} fontWeight="bold"> {sp.cart_quantity} </Box>

                            {/* Increase */}
                            <Button onClick={() => handleIncrease({ product_id: product?.product_id, variant_id: sp.variant_id, multipack_id: sp.multipack_id })}
                              bg="white" color="green.600" fontSize="20px" px={4}>
                              +
                            </Button>

                          </Flex>

                          {/* Remove Button */}
                          <Button size="sm" colorScheme="red" onClick={() => handleRemoveProduct(sp.cart_item_id)}> Remove </Button>
                        </HStack>
                      </Box>
                    </Flex>
                  ))}

                  {/* ------------------------- */}
                  {/* MULTIPACK UI              */}
                  {/* ------------------------- */}
                  {product.multi_packs.map((mp) => {
                    const key = mp.multipack_id;
                    return (
                      <Flex key={mp.multipack_id} p={4} borderBottom="1px solid #e5e5e5" gap={4} align="flex-start">
                        {/* Product Image */}
                        <Image src={product.product_img} alt={product.product_name} boxSize="70px" objectFit="contain" />

                        {/* Right Section */}
                        <Box flex="1">
                          <Text fontSize="16px" fontWeight="600"> {" "} {product.product_name}{" "} </Text>
                          <Text fontSize="14px" color="gray.500"> {" "}{product.product_category}{" "} </Text>
                          <Text fontSize="14px" mt={1}>
                            Size{" "}
                            <b>
                              {mp.total_quantity_value} {mp.quantity_type} (
                              {mp.base_quantity}{mp.quantity_type}
                              <RxCross2 style={{ display: "inline", margin: "0 5px" }} />
                              {mp.pack_quantity})
                            </b>
                          </Text>

                          <HStack spacing={2} mt={1}>
                            <Text fontSize="16px" fontWeight="bold"> ₹{mp.total_discounted_price} </Text>
                            <Text fontSize="14px" color="gray.500" as="s"> ₹{mp.total_actual_price} </Text>
                          </HStack>

                          <HStack mt={3}>
                            <Flex height="33px" border="1px solid #ddd" rounded="lg" overflow="hidden" align="center">

                              {/* DELETE IF QUANTITY = 1 */}
                              {mp.cart_quantity === 1 ? (
                                <Button onClick={() => handleDecrease({ product_id: product?.product_id, variant_id: mp.variant_id, multipack_id: mp.multipack_id })} bg="white" color="red.500" fontSize="18px" px={4}>🗑</Button>
                              ) : (
                                <Button onClick={() => handleDecrease({ product_id: product?.product_id, variant_id: mp.variant_id, multipack_id: mp.multipack_id })} bg="white" color="red.500" fontSize="20px" px={4}>-</Button>
                              )}

                              {/* Quantity Box */}
                              <Box bg="green.600" color="white" px={6} py={1} fontWeight="bold">{mp.cart_quantity}</Box>

                              {/* Increase Button */}
                              <Button onClick={() => handleIncrease({ product_id: product?.product_id, variant_id: mp.variant_id, multipack_id: mp.multipack_id })} bg="white" color="green.600" fontSize="20px" px={4}>+</Button>
                            </Flex>

                            {/* Remove Button */}
                            <Button size="sm" colorScheme="red" onClick={() => handleRemoveProduct(mp.cart_item_id)}>
                              Remove
                            </Button>
                          </HStack>
                        </Box>
                      </Flex>
                    )
                  })}
                </Box>
              ))
            )}
          </DrawerBody>

        {cartData?.length !== 0 &&  <DrawerFooter>
            <Button colorScheme="blue" w="100%" onClick={() => navigate("/save-address")}>Go to Checkout</Button>
          </DrawerFooter>}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
