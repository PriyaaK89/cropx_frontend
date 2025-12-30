import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaHeart } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";
import ProductQuantityModal from "../Models/ProductQuantityModal";

const ProductCard = ({ product }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get first valid single pack
  const firstSingle = Array.isArray(product.single_packs)
    ? product.single_packs.find(
        (v) =>
          v &&
          v.actual_price &&
          v.discounted_price &&
          v.quantity_value &&
          v.quantity_type
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
      ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
      : null;

  return (
    <>
      {isOpen && (
        <ProductQuantityModal
          isQuantityModalOpen={isOpen}
          onQuantityModalClose={onClose}
          product={product}
        />
      )}

      <Link to={`/product-details/${product.id}`}>
        <Box
          bg={cardBg}
          rounded="2xl"
          shadow="0px 1px 3px #dddddd"
          overflow="hidden"
          position="relative"
          transition="all 0.3s"
          width="220px"
          _hover={{ transform: "scale(1.03)", shadow: "lg" }}
        >
          {/* Discount badge */}
          {discountPercent && (
            <Badge
              position="absolute"
              top={0}
              left={0}
              bg="#2c7d19"
              color="white"
              fontWeight={400}
              rounded="0px 0px 24px"
              px={3}
              py={1}
              fontSize="12px"
            >
              {discountPercent}% OFF
            </Badge>
          )}

          {/* Wishlist icon */}
          <Box position="absolute" top={2} right={2}>
            <FaHeart color="gray" />
          </Box>

          {/* Product Image */}
          <Image
            src={product.product_img}
            alt={product.product_name}
            w="100%"
            h="200px"
            pt="2rem"
            objectFit="contain"
            bg="white"
          />

          {/* Product Info */}
          <Box p={4}>
            <Text
              fontWeight="semibold"
              fontSize="md"
              noOfLines={2}
              lineHeight="19px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {product.product_name}
            </Text>

            <Text fontSize="12px" color="gray.500">
              {product.category_name}
            </Text>

            {firstSingle ? (
              <>
                {/* Price */}
                <Flex align="center" mt={2}>
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    color={priceColor}
                  >
                    ₹{discountedPrice}
                  </Text>
                  <Text
                    as="s"
                    fontSize="12px"
                    color="gray.400"
                    ml={2}
                  >
                    ₹{actualPrice}
                  </Text>
                </Flex>

                {/* Savings */}
                <HStack gap="3px">
                  <HiPercentBadge fill="green" />
                  <Text fontSize="12px" color="green.500">
                    Save ₹{(actualPrice - discountedPrice).toFixed(2)}
                  </Text>
                </HStack>

                {/* Size selector */}
                <HStack justifyContent="space-between" mt={2}>
                  <Text fontSize="14px" color="#4d4d4d">
                    Size
                  </Text>

                  <Flex
                    align="center"
                    gap={2}
                    px={4}
                    py={1}
                    borderWidth="1px"
                    borderRadius="lg"
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpen();
                    }}
                  >
                    <Text fontSize="14px">
                      {firstSingle.quantity_value}{" "}
                      {firstSingle.quantity_type}
                    </Text>
                    <Icon as={FaChevronDown} boxSize={4} />
                  </Flex>
                </HStack>
              </>
            ) : (
              <Text color="red.400" fontSize="13px">
                Variant not available
              </Text>
            )}
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default ProductCard;
