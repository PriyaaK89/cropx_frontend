import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Box, Image, Text, Flex, IconButton, HStack, useToast, } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Config } from "../Utils/Config";
import { useNavigate } from "react-router-dom";


const CartDrawer = ({ isCartDrawerOpen, onCartDrawerClose, handleIncrease, handleDecrease }) => {
  const { cartData } = useContext(CartContext);
  const toast = useToast();
  const navigate = useNavigate();


  const handleRemoveProduct = async () => {
    try {
      const response = await axios.post(`${Config?.remove_cart_item}`, {
        cart_id: ''
      })
      if (response?.status === 200) {
        toast({
          description: 'Item removed from cart',
          duration: 2000,
          isClosable: true,
          status: "success"
        })
      }
    } catch (error) {
      console.log(error, "Error in fetching API response.")
    }
  }

  return (
    <Drawer isOpen={isCartDrawerOpen} onClose={onCartDrawerClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>

        <DrawerBody>
          {cartData?.length === 0 ? (
            <Text>No items in cart</Text>
          ) : (
            cartData.map((product) => (
              <Box key={product.product_id} mb={5}>
                {product.single_packs.map((sp) => (
                  <Flex
                    key={sp.variant_id} p={4} borderBottom="1px solid #e5e5e5" gap={4} align="flex-start">

                    <Image
                      src={product.product_img} alt={product.product_name} boxSize="70px" objectFit="contain" />

                    {/* Right Section */}
                    <Box flex="1">
                      <Text fontSize="16px" fontWeight="600">
                        {product.product_name}
                      </Text>

                      <Text fontSize="14px" color="gray.500">
                        {product.product_category}
                      </Text>

                      <Text fontSize="14px" mt={1}>
                        Size <b>{sp.quantity_value + " " + sp.quantity_type}</b>
                      </Text>

                      {/* Price Section */}
                      <HStack spacing={2} mt={1}>
                        <Text fontSize="16px" fontWeight="bold">
                          ₹{sp.discounted_price}
                        </Text>
                        <Text fontSize="14px" color="gray.500" as="s">
                          ₹{sp.actual_price}
                        </Text>
                      </HStack>

                      {/* Qty & Remove */}
                      <HStack mt={3}>
                        {/* Quantity Box */}
                        <Flex
                          border="1px solid #ccc"
                          borderRadius="md"
                          overflow="hidden"
                        >
                          <Button size="sm" onClick={() => handleDecrease({
                            variant_id: sp.variant_id,
                            multipack_id: sp.multipack_id
                          })}>-</Button>

                          <Box
                            px={4}
                            py={1}
                            bg="green.500"
                            color="white"
                            fontWeight="bold"
                          >
                            {sp.cart_quantity}
                          </Box>

                          <Button size="sm" onClick={() => handleIncrease({
                            variant_id: sp.variant_id,
                            multipack_id: sp.multipack_id
                          })} >+</Button>
                        </Flex>

                        {/* Remove Button */}
                        <Button size="sm">Remove</Button>
                      </HStack>
                    </Box>
                  </Flex>
                ))}

                {/* ------------------------- */}
                {/* MULTIPACK UI              */}
                {/* ------------------------- */}
                {product.multi_packs.map((mp) => (
                  <Flex
                    key={mp.multipack_id}
                    p={4}
                    borderBottom="1px solid #e5e5e5"
                    gap={4}
                    align="flex-start"
                  >
                    {/* Product Image */}
                    <Image
                      src={product.product_img}
                      alt={product.product_name}
                      boxSize="70px"
                      objectFit="contain"
                    />

                    {/* Right Section */}
                    <Box flex="1">
                      <Text fontSize="16px" fontWeight="600"> {product.product_name} </Text>

                      <Text fontSize="14px" color="gray.500"> {product.product_category} </Text>

                      <Text fontSize="14px" mt={1}>
                        Size{" "}
                        <b>
                          {mp.total_quantity_value} {mp.quantity_type}{" "}
                          (
                          {mp.base_quantity}
                          {mp.quantity_type}
                          <RxCross2 style={{ display: "inline", margin: "0 5px" }} />
                          {mp.pack_quantity}
                          )
                        </b>
                      </Text>

                      <HStack spacing={2} mt={1}>
                        <Text fontSize="16px" fontWeight="bold">
                          ₹{mp.total_discounted_price}
                        </Text>
                        <Text fontSize="14px" color="gray.500" as="s">
                          ₹{mp.total_actual_price}
                        </Text>
                      </HStack>

                      <HStack mt={3}>

                        <Flex
                          border="1px solid #ccc"
                          borderRadius="md"
                          overflow="hidden">
                          <Button size="sm">-</Button>

                          <Box px={4} py={1} bg="green.500" color="white" fontWeight="bold" >
                            {mp.cart_quantity}
                          </Box>

                          <Button size="sm">+</Button>
                        </Flex>

                        {/* Remove Button */}
                        <Button size="sm">Remove</Button>
                      </HStack>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ))
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="blue" w="100%" onClick={()=>navigate("/checkoutpage")}>
            Go to Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
