import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Button,
  useDisclosure,
  useColorModeValue,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";
import { Config } from "../Utils/Config";
import ProductQuantityModal from "../Models/ProductQuantityModal";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get(`${Config?.Get_Products}`);
      if (response?.status === 200 && response?.data?.data) {
        setProducts(response.data.data);
      } else {
        console.log("Please try again.");
      }
    } catch (error) {
      console.log(error, "Something went wrong.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  const getDiscountPercent = (actual, discounted) => {
    const diff = actual - discounted;
    const percent = (diff / actual) * 100;
    return Math.round(percent);
  };

  return (
    <Box
      p={4}
      mt="4rem"
      bg={useColorModeValue("#fbfcf7", "#fbfcf7")}
      minH="100vh"
    >
      <HStack justifyContent="space-between" padding="0rem 2rem">
        <Text fontSize="18px" fontWeight={600} color="#4d4d4d" padding="1rem 2rem 3rem">
          Best Selling
        </Text>
        <Text fontSize="11px" textDecoration="underline">
          View All
        </Text>
      </HStack>

      <Flex flexWrap="wrap" justifyContent="center" gap="2rem">
        {products.map((p) => {
          const firstSingle = p.single_packs?.[0];

          const actualPrice = firstSingle
            ? parseFloat(firstSingle.actual_price)
            : null;
          const discountedPrice = firstSingle
            ? parseFloat(firstSingle.discounted_price)
            : null;
          const discountPercent =
            actualPrice && discountedPrice
              ? getDiscountPercent(actualPrice, discountedPrice)
              : null;

          return (
            <>
            <Link key={p?.id} to={`/product-details/${p?.id}`}>
            <Box
              key={p?.id} bg={cardBg} rounded="2xl" shadow="md" overflow="hidden" position="relative" transition="all 0.3s" width="250px"
              _hover={{ transform: "scale(1.03)", shadow: "lg" }}>

              {discountPercent && (
                <Badge
                  position="absolute" top={0} left={0} background="#2c7d19" color="white" fontWeight={400} rounded="0px 0px 24px" px={3} py={1}
                  fontSize="12px">
                  {discountPercent}% OFF
                </Badge>
              )}

              <Box position="absolute" top={2} right={2}>
                <FaHeart color="gray" />
              </Box>

              <Image src={p.product_img} alt={p.product_name} w="100%" h="200px" objectFit="contain" bg="gray.100" />

              <Box p={4}>
                <Text fontWeight="semibold" fontFamily="Inter-SemiBold" fontSize="md" noOfLines={2} lineHeight="19px">
                  {p.product_name}
                </Text>
                <Text fontSize="12px" color="gray.500"> {p.product_category} </Text>

                {firstSingle ? (
                  <>
                    <Flex align="center" mt={2}>
                      <Text fontSize="lg" fontFamily="Inter-SemiBold" color={priceColor}>
                        ₹{discountedPrice}
                      </Text>
                      <Text as="s" fontSize="12px" color="gray.400" ml={2}>
                        ₹{actualPrice}
                      </Text>
                    </Flex>

                    <HStack gap="3px">
                      <HiPercentBadge fill="green" />
                      <Text fontSize="12px" color="green.500">
                        Save ₹{(actualPrice - discountedPrice).toFixed(2)}
                      </Text>
                    </HStack>

                    <HStack justifyContent={"space-between"} mt="8px">
                      <Text fontSize="14px">Size</Text>
                      <Flex align="center" justify="space-between" px={4} py={1} gap={2} borderWidth="1px" borderRadius="lg" cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                        onClick={() => handleOpenModal(p)}
                      >
                        <Text fontSize="14px">
                          {firstSingle.quantity_value}{" "}
                          {firstSingle.quantity_type}
                        </Text>
                        <Icon
                          as={FaChevronDown}
                          boxSize={4}
                          color="gray.500"
                          mt="3px"
                        />
                      </Flex>
                    </HStack>
                  </>
                ) : ( <Text fontSize="sm" color="red.400" mt={3}> Variant not available </Text> )}
              </Box>
            </Box>
            </Link>
            </>
          );
        })}
      </Flex>

      {selectedProduct && (
        <ProductQuantityModal isOpen={isOpen} onClose={onClose} product={selectedProduct} />
      )}
    </Box>
  );
};

export default Products;
