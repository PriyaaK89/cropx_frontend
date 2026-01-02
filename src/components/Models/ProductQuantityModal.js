import React, { useContext, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useColorModeValue,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import LoginModal from "./LoginModal";
import useCartQuantityManager from "../../hooks/userCartAction";

const ProductQuantityModal = ({
  isQuantityModalOpen,
  onQuantityModalClose,
  product, onCartDrawerOpen
}) => {
  const { user } = useContext(AuthContext);
   const userId = user?.data?.id;
  console.log(userId, "UserId");
    const toast = useToast();
  // const [quantities, setQuantities] = useState({});
  const { cartItems, cartData, getCartItems } = useContext(CartContext);
    const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const {
  quantities,
  handleIncrease,
  handleDecrease,
  syncQuantitiesFromCart,
} = useCartQuantityManager({
  userId,
  product,
  cartData,
  getCartItems,
  onLoginModalOpen,
});
 
  console.log(product, "ProductData");
  console.log(product?.id, "productId");


  useEffect(() => {
    if (userId) {
      getCartItems();
    }
  }, [userId]);


  useEffect(() => {
  if (!isQuantityModalOpen) return;

  syncQuantitiesFromCart();
}, [isQuantityModalOpen, cartData, syncQuantitiesFromCart]);

  const cardBg = useColorModeValue("white", "gray.800");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };

  const isProductInCart = cartData?.some(
    (item) => item.product_id === product?.id
  );

  const handleOpenDrawer = () => {
    onQuantityModalClose();
    setTimeout(()=>{
      onCartDrawerOpen();
    },300)
  };

  return (
    <>
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        onLoginModalClose={onLoginModalClose}
      />


      <Modal
        isOpen={isQuantityModalOpen}
        onClose={onQuantityModalClose}
        size="lg"
        scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent rounded="2xl" p={2}>
          <ModalHeader>
            <Flex align="center" gap={4}>
              <Image
                src={product.product_img}
                alt={product.product_name}
                boxSize="70px"
                objectFit="cover"
                rounded="lg"
              />
              <Box>
                <Text fontWeight="bold">{product.product_name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {" "}
                  {product.product_description}{" "}
                </Text>
                {isProductInCart && (
                  <Button
                    colorScheme="blue"
                    width="full"
                    mb={4}
                    onClick={handleOpenDrawer}>
                    Go to Cart
                  </Button>
                )}
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
                    const key = `single_${v.variant_id}`;


                    return (
                      <Box
                        key={key}
                        p={3}
                        rounded="xl"
                        bg={cardBg}
                        shadow="xs"
                        borderWidth="1px"
                        borderColor="gray.100">
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="medium">
                              {" "}
                              {v.quantity_value} {v.quantity_type}{" "}
                            </Text>
                            <Flex align="center" gap={2}>
                              <Text fontWeight="bold" color="green.600">
                                {" "}
                                ₹{discounted}{" "}
                              </Text>
                              <Text as="s" color="gray.400" fontSize="sm">
                                {" "}
                                ₹{actual}{" "}
                              </Text>
                              <Badge colorScheme="orange">
                                {" "}
                                {discountPercent}% OFF{" "}
                              </Badge>
                            </Flex>
                            <Text color="green.500" fontSize="sm">
                              {" "}
                              Save ₹{(actual - discounted).toFixed(2)}{" "}
                            </Text>
                          </Box>

                          {quantities[key] ? (
                            <Flex
                              height="33px"
                              border="1px solid #ddd"
                              rounded="lg"
                              overflow="hidden"
                              align="center">
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
                              <Box
                                bg="green.600"
                                color="white"
                                px={6}
                                py={1}
                                fontWeight="bold">
                                {quantities[key]}
                              </Box>

                              {/* Add Button */}
                              <Button
                                onClick={() =>
                                  handleIncrease({
                                    variant_id: v.variant_id,
                                    multipack_id: null,
                                  })
                                }
                                bg="white"
                                color="green.600"
                                fontSize="20px"
                                px={4}>
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
                <Text fontWeight="semibold" mb={3}>
                  Multi Packs
                </Text>
                <VStack align="stretch" spacing={4}>
                  {product.multi_packs.map((m) => {
                    const actual = parseFloat(m.actual_price);
                    const discounted = parseFloat(m.discounted_price);
                    const discountPercent = getDiscountPercent(
                      actual,
                      discounted
                    );
                    console.log("CHECKING UI KEY:", m.multipack_id);
                    console.log("CURRENT QUANTITIES:", quantities);

                    // const key = m.multipack_id; 
                    const key = `multi_${m.multipack_id}`;

                    return (
                      <Box
                        key={key}
                        p={3}
                        rounded="xl"
                        bg={cardBg}
                        shadow="xs"
                        borderWidth="1px"
                        borderColor="gray.100">
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="medium">
                              {m.pack_quantity} Packs of {m.base_quantity_value}{" "}
                              {m.base_quantity_type} ({m.total_quantity_value}{" "}
                              {m.base_quantity_type} total)
                            </Text>

                            <Flex align="center" gap={2}>
                              <Text fontWeight="bold" color="green.600">
                                ₹{discounted}
                              </Text>
                              <Text as="s" color="gray.400" fontSize="sm">
                                ₹{actual}
                              </Text>
                              <Badge colorScheme="orange">
                                {discountPercent}% OFF
                              </Badge>
                            </Flex>

                            <Text color="green.500" fontSize="sm">
                              Save ₹{(actual - discounted).toFixed(2)}
                            </Text>
                          </Box>

                          {/*  CHECK QUANTITY USING multipack_id */}
                          {quantities[key] ? (
                            <Flex
                              height="33px"
                              border="1px solid #ddd"
                              rounded="lg"
                              overflow="hidden"
                              align="center">
                              {/* DELETE IF QUANTITY = 1 */}
                              {quantities[key] === 1 ? (
                                <Button
                                  onClick={() =>
                                    handleDecrease({
                                      variant_id: m.variant_id,
                                      multipack_id: m.multipack_id,
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
                                      variant_id: m.variant_id,
                                      multipack_id: m.multipack_id,
                                    })
                                  }
                                  bg="white"
                                  color="red.500"
                                  fontSize="20px"
                                  px={4}>
                                  -
                                </Button>
                              )}

                              <Box bg="green.600" color="white" px={6} py={1} fontWeight="bold">
                                {quantities[key]}
                              </Box>

                              <Button
                                onClick={() =>
                                  handleIncrease({
                                    variant_id: m.variant_id,
                                    multipack_id: m.multipack_id,
                                  })
                                }
                                bg="white"
                                color="green.600"
                                fontSize="20px"
                                px={4}>
                                +
                              </Button>
                            </Flex>
                          ) : (
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() =>
                                handleIncrease({
                                  variant_id: m.variant_id,
                                  multipack_id: m.multipack_id,
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
