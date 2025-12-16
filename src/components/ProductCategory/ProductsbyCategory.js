import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Config } from "../Utils/Config";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ProductQuantityModal from "../Models/ProductQuantityModal";
import {  FaChevronDown, FaHeart } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";


const ProductsByCategory = () => {
  const { id } = useParams();
  console.log(id, "id");

  const [categorisedProducts, setCategorisedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    isOpen: isQuantityModalOpen,
    onOpen: onQuantityModalOpen,
    onClose: onQuantityModalClose,
  } = useDisclosure();
  const toast = useToast();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    onQuantityModalOpen();
  };

  const fetchProductsByCategories = async () => {
    try {
      const response = await axios.get(
        `${Config?.get_product_by_categories}/category/${id}`
      );
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        setCategorisedProducts(response?.data?.data);
      } else {
        setCategorisedProducts([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong while fetching products.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchProductsByCategories();
  }, []);

  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  // const handleOpenModal = (product) => {
  //   setSelectedProduct(product);
  //   onQuantityModalOpen();
  // };

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };

  return (
    <>
      <Box my={10}>
        <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
          {Array.isArray(categorisedProducts) &&
          categorisedProducts.length > 0 ? (
            categorisedProducts.map((p) => {
              const firstSingle = Array.isArray(p.single_packs)
                ? p.single_packs.find(
                    (v) =>
                      v &&
                      v.actual_price &&
                      v.discounted_price &&
                      v.quantity_value && v.quantity_type
                  )
                : null;

              const actualPrice = firstSingle
                ? Number(firstSingle.actual_price)
                : null;

              const discountedPrice = firstSingle
                ? Number(firstSingle.discounted_price)
                : null;

              const discountPercent =
                actualPrice && discountedPrice
                  ? Math.round(
                      ((actualPrice - discountedPrice) / actualPrice) * 100
                    )
                  : null;

              return (
                <Link key={p.id} to={`/product-details/${p.id}`}>
                  <Box
                    key={p?.id}
                    bg={cardBg}
                    rounded="2xl"
                    shadow="md"
                    overflow="hidden"
                    position="relative"
                    transition="all 0.3s"
                    width="250px"
                    _hover={{ transform: "scale(1.03)", shadow: "lg" }}>
                    {discountPercent && (
                      <Badge
                        position="absolute"
                        top={0}
                        left={0}
                        background="#2c7d19"
                        color="white"
                        fontWeight={400}
                        rounded="0px 0px 24px"
                        px={3}
                        py={1}
                        fontSize="12px">
                        {discountPercent}% OFF
                      </Badge>
                    )}

                    <Box position="absolute" top={2} right={2}>
                      <FaHeart color="gray" />
                    </Box>

                    <Image
                      src={p.product_img}
                      alt={p.product_name}
                      w="100%"
                      h="200px"
                      paddingTop="2rem"
                      objectFit="contain"
                      bg="white"
                    />

                    <Box p={4}>
                      <Text
                        fontWeight="semibold"
                        fontFamily="Inter-SemiBold"
                        fontSize="md"
                        noOfLines={2}
                        lineHeight="19px">
                        {p.product_name}
                      </Text>
                      <Text fontSize="12px" color="gray.500">
                        {" "}
                        {p.product_category}{" "}
                      </Text>

                      {firstSingle ? (
                        <>
                          <Flex align="center" mt={2}>
                            <Text
                              fontSize="lg"
                              fontFamily="Inter-SemiBold"
                              color={priceColor}>
                              ₹{discountedPrice}
                            </Text>
                            <Text
                              as="s"
                              fontSize="12px"
                              color="gray.400"
                              ml={2}>
                              ₹{actualPrice}
                            </Text>
                          </Flex>
                          <HStack gap="3px">
                            <HiPercentBadge fill="green" />
                            <Text fontSize="12px" color="green.500">
                              Save ₹{(actualPrice - discountedPrice).toFixed(2)}
                            </Text>
                          </HStack>
                          <HStack justifyContent="space-between">
                            <Text fontSize="14px" color="#4d4d4d">Size</Text>
                            <Flex  align="center" justify="space-between" px={4} py={1} gap={2} borderWidth="1px" borderRadius="lg"
                            cursor="pointer"
                            _hover={{ bg: "gray.100" }}  onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleOpenModal(p);
                            }}>
                              <Text fontSize="14px" color="#4d4d4d">{firstSingle?.quantity_value}{" "} {firstSingle?.quantity_type}</Text>
                              <Icon as={FaChevronDown} boxSize={4} color="gray.500" mt="3px" />
                            </Flex>
                          </HStack>
                        </>
                      ) : (
                        <Text color="red.400">Variant not available</Text>
                      )}
                    </Box>
                  </Box>
                </Link>
              );
            })
          ) : (
            <Text>No Products Found.</Text>
          )}
        </Flex>

        {selectedProduct && (
          <ProductQuantityModal
            isQuantityModalOpen={isQuantityModalOpen}
            onQuantityModalClose={onQuantityModalClose}
            product={selectedProduct}
          />
        )}
      </Box>
    </>
  );
};

export default ProductsByCategory;
