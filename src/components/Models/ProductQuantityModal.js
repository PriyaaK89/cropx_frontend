import React from "react";
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
} from "@chakra-ui/react";

const ProductQuantityModal = ({ isOpen, onClose, product }) => {
  const cardBg = useColorModeValue("white", "gray.800");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
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
                {product.product_description}
              </Text>
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
                  const discountPercent = getDiscountPercent(actual, discounted);

                  return (
                    <Box
                      key={v.variant_id}
                      p={3}
                      rounded="xl"
                      bg={cardBg}
                      shadow="xs"
                      borderWidth="1px"
                      borderColor="gray.100"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium">
                            {v.quantity_value} {v.quantity_type}
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

                        <Button colorScheme="green" size="sm">
                          Add to Cart
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          )}

          {/* Divider between sections */}
          {product.single_packs?.length > 0 && product.multi_packs?.length > 0 && (
            <Divider my={4} />
          )}

          {/* ---------- MULTI PACKS ---------- */}
          {product.multi_packs && product.multi_packs.length > 0 && (
            <Box>
              <Text fontWeight="semibold" mb={3}>
                Multi Packs
              </Text>
              <VStack align="stretch" spacing={4}>
                {product.multi_packs.map((m) => {
                  const actual = parseFloat(m.total_actual_price);
                  const discounted = parseFloat(m.total_discounted_price);
                  const discountPercent = getDiscountPercent(actual, discounted);

                  return (
                    <Box
                      key={m.multipack_id}
                      p={3}
                      rounded="xl"
                      bg={cardBg}
                      shadow="xs"
                      borderWidth="1px"
                      borderColor="gray.100"
                    >
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

                        <Button colorScheme="green" size="sm">
                          Add to Cart
                        </Button>
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
  );
};

export default ProductQuantityModal;
