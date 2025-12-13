import React, { useContext, useEffect, useState } from "react";
import { Box, Image, Text, Flex, Badge, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, useColorModeValue, Divider, useDisclosure, useToast, } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import CartDrawer from "../Cart/Cart";
import { Config } from "../Utils/Config";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import LoginModal from "./LoginModal";

const ProductQuantityModal = ({ isQuantityModalOpen, onQuantityModalClose, product }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;
  console.log(userId, "UserId");
  console.log(product, "ProductData");
  console.log(product?.id, "productId")
  const toast = useToast();
  const [quantities, setQuantities] = useState({});
  const { cartItems, cartData, getCartItems } = useContext(CartContext);

  useEffect(() => {
    if (userId) {
      getCartItems(); 
    }
  }, [userId]);

  useEffect(() => {
    if (!isQuantityModalOpen) return;
    if (!product) return;
    if (!cartData || cartData.length === 0) return;

    syncQuantitiesFromCart();
  }, [isQuantityModalOpen, cartData, product]);


 const { isOpen: isCartDrawerOpen, onOpen: onCartDrawerOpen, onClose: onCartDrawerClose} = useDisclosure();
 const {isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose} = useDisclosure()

  const cardBg = useColorModeValue("white", "gray.800");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };

  const isProductInCart = cartData?.some(
    (item) => item.product_id === product?.id
  );

  const handleIncrease = async ({ variant_id, multipack_id }) => {
    const key = multipack_id ? multipack_id : variant_id;
    if(!userId){
      toast({
        description: 'Please login first to add items to cart!',
        status: "error",
        duration: 3000,
        isClosable: true
      })
      onLoginModalOpen();
      return;
    }
    try {
      const payload = {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
        variant_id: variant_id || null,
        multipack_id: multipack_id || null,
      };

      const response = await axios.post(Config.Add_to_cart, payload);

      if (response.status === 200) {
        setQuantities(prev => ({
          ...prev,
          [key]: (prev[key] || 0) + 1,
        }));
        getCartItems()

      }
    } catch (e) {
      console.log(e);
    }
  };


  const handleDecrease = async ({ variant_id, multipack_id }) => {
    const key = multipack_id ? multipack_id : variant_id;

    try {
      const response = await axios.post(Config.decrease_item, {
        user_id: userId,
        product_id: product.id,
        variant_id,
        multipack_id,
      });

      if (response.status === 200) {
        setQuantities(prev => ({
          ...prev,
          [key]: (prev[key] || 0) - 1,
        }));
        getCartItems()

      }
    } catch (e) {
      console.log(e);
    }
  };

  const syncQuantitiesFromCart = () => {
    const productId = product?.id ?? product?.product_id;

    const item = cartData?.find(p => p.product_id === productId);

    if (!item) {
      setQuantities({});
      return;
    }

    let q = {};

    item.single_packs?.forEach(sp => {
      q[sp.variant_id] = sp.cart_quantity;
    });

    item.multi_packs?.forEach(mp => {
      q[mp.multipack_id] = mp.cart_quantity;
    });

    setQuantities(q);
  };

   const handleOpenDrawer = ()=>{
    onCartDrawerOpen()
    onQuantityModalClose()
   }


  return (
    <>
    <LoginModal isLoginModalOpen={isLoginModalOpen} onLoginModalClose={onLoginModalClose}/>
      <CartDrawer isCartDrawerOpen={isCartDrawerOpen} onCartDrawerClose={onCartDrawerClose} />

      <Modal isOpen={isQuantityModalOpen} onClose={onQuantityModalClose} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent rounded="2xl" p={2}>
          <ModalHeader>
            <Flex align="center" gap={4}>
              <Image src={product.product_img} alt={product.product_name}
                boxSize="70px" objectFit="cover" rounded="lg" />
              <Box>
                <Text fontWeight="bold">{product.product_name}</Text>
                <Text fontSize="sm" color="gray.500"> {product.product_description} </Text>
                 {isProductInCart && (
                                <Button
                                  colorScheme="blue"
                                  width="full"
                                  mb={4}
                                 onClick={handleOpenDrawer}
                                >
                                  Go to Cart
                                </Button>)}
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* ---------- SINGLE PACKS ---------- */}
            {product.single_packs && product.single_packs.length > 0 && (
              <Box mb={6}>
                <Text fontWeight="semibold" mb={3}>
                  Single Packs
                </Text>
                <VStack align="stretch" spacing={4}>
                  {product.single_packs.map((v) => {
                    const actual = parseFloat(v.actual_price);
                    const discounted = parseFloat(v.discounted_price);
                    const discountPercent = getDiscountPercent(
                      actual,
                      discounted
                    );

                    return (
                      <Box
                        key={v.variant_id} p={3} rounded="xl" bg={cardBg} shadow="xs" borderWidth="1px" borderColor="gray.100">
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="medium"> {v.quantity_value} {v.quantity_type} </Text>
                            <Flex align="center" gap={2}>
                              <Text fontWeight="bold" color="green.600"> ₹{discounted} </Text>
                              <Text as="s" color="gray.400" fontSize="sm"> ₹{actual} </Text>
                              <Badge colorScheme="orange"> {discountPercent}% OFF </Badge>
                             
                            </Flex>
                            <Text color="green.500" fontSize="sm"> Save ₹{(actual - discounted).toFixed(2)} </Text>
                          </Box>

                          {quantities[v.variant_id] ? (
                            <Flex height="33px" border="1px solid #ddd" rounded="lg" overflow="hidden" align="center">

                              <Button
                                onClick={() =>
                                  handleDecrease({
                                    variant_id: v.variant_id,
                                    multipack_id: null,
                                  })
                                }
                                bg="white"
                                color="red.500"
                                fontSize="20px"
                                px={4}>
                                -
                              </Button>

                              {/* Quantity */}
                              <Box bg="green.600" color="white" px={6} py={1} fontWeight="bold">
                                {quantities[v.variant_id]}
                              </Box>

                              {/* Add Button */}
                              <Button
                                onClick={() =>
                                  handleIncrease({
                                    variant_id: v.variant_id,
                                    multipack_id: null,
                                  })
                                } bg="white" color="green.600" fontSize="20px" px={4}>
                                +
                              </Button>
                            </Flex>
                          ) : (
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() =>
                                handleIncrease({
                                  variant_id: v.variant_id,
                                  multipack_id: null,
                                })
                              }>
                              Add to Cart
                            </Button>
                          )}
                        </Flex>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            )}

            {/* Divider between sections */}
            {product.single_packs?.length > 0 &&
              product.multi_packs?.length > 0 && <Divider my={4} />}

            {/* ---------- MULTI PACKS ---------- */}
            {product.multi_packs && product.multi_packs.length > 0 && (

              <Box>
                <Text fontWeight="semibold" mb={3}>Multi Packs</Text>
                <VStack align="stretch" spacing={4}>
                  {product.multi_packs.map((m) => {
                    const actual = parseFloat(m.total_actual_price);
                    const discounted = parseFloat(m.total_discounted_price);
                    const discountPercent = getDiscountPercent(actual, discounted);
                    console.log("CHECKING UI KEY:", m.multipack_id);
                    console.log("CURRENT QUANTITIES:", quantities);

                    const key = m.multipack_id; //  Always use multipack_id as the key

                    return (
                      <Box key={m.multipack_id} p={3} rounded="xl" bg={cardBg} shadow="xs" borderWidth="1px" borderColor="gray.100">
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="medium">{m.pack_quantity} Packs of {m.base_quantity_value} {m.base_quantity_type} ({m.total_quantity_value} {m.base_quantity_type} total)</Text>

                            <Flex align="center" gap={2}>
                              <Text fontWeight="bold" color="green.600">₹{discounted}</Text>
                              <Text as="s" color="gray.400" fontSize="sm">₹{actual}</Text>
                              <Badge colorScheme="orange">{discountPercent}% OFF</Badge>
                            </Flex>

                            <Text color="green.500" fontSize="sm">Save ₹{(actual - discounted).toFixed(2)}</Text>
                          </Box>

                          {/*  CHECK QUANTITY USING multipack_id */}
                          {quantities[key] ? (

                            <Flex height="33px" border="1px solid #ddd" rounded="lg" overflow="hidden" align="center">

                              {/* DELETE IF QUANTITY = 1 */}
                              {quantities[key] === 1 ? (
                                <Button onClick={() => handleDecrease({ variant_id: m.variant_id, multipack_id: m.multipack_id })} bg="white" color="red.500" fontSize="18px" px={4}>🗑</Button>
                              ) : (
                                <Button onClick={() => handleDecrease({ variant_id: m.variant_id, multipack_id: m.multipack_id })} bg="white" color="red.500" fontSize="20px" px={4}>-</Button>
                              )}

                              {/* Quantity Box */}
                              <Box bg="green.600" color="white" px={6} py={1} fontWeight="bold">{quantities[key]}</Box>

                              {/* Increase Button */}
                              <Button onClick={() => handleIncrease({ variant_id: m.variant_id, multipack_id: m.multipack_id })} bg="white" color="green.600" fontSize="20px" px={4}>+</Button>
                            </Flex>
                          ) : (
                            <Button colorScheme="green" size="sm" onClick={() => handleIncrease({ variant_id: m.variant_id, multipack_id: m.multipack_id })}>Add to Cart</Button>
                          )}

                        </Flex>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            )}


            {/* ---------- NO VARIANTS ---------- */}
            {!product.single_packs?.length && !product.multi_packs?.length && (
              <Text color="gray.500">No variants available.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductQuantityModal;
