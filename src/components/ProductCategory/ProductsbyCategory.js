import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Config } from "../Utils/Config";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProductQuantityModal from "../Models/ProductQuantityModal";
import { FaChevronDown, FaHeart } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";
import ListingHeader from "./ListingHeader";
import ProductFilters from "./ProductFilter";
import NoProducts from "./NoProducts";

const ProductsByCategory = () => {
  const { id } = useParams();
  const { level } = useParams();
  console.log(id, "id");
  console.log(level, "level");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(null);
  const [stock, setStock] = useState(null);

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
        `${Config.get_product_by_categories}/${level}/${id}`,
        {
          params: {
            page,
            limit,
            sort,
            minPrice,
            maxPrice,
            rating,
            stock,
          },
        }
      );

      if (response?.data?.success) {
        setProducts(response.data.data);
        setTotalItems(response.data.totalItems);
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
  }, [page, sort, minPrice, maxPrice, rating, stock, level, id]);

  useEffect(() => {
    setPage(1);
  }, [sort, minPrice, maxPrice, rating, stock, level, id]);

  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  const clearFilters = () => {
  setSort("");
  setMinPrice("");
  setMaxPrice("");
  setRating(null);
  setStock(null);
  setPage(1);
};

  return (
    <>
      <Box my={3} w="100%">
        <HStack alignItems="flex-start" width="100%" gap="0px">
          <Box width="26%">
            <ProductFilters
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              rating={rating}
              setRating={setRating}
              stock={stock}
              setStock={setStock}
            />
          </Box>
          <VStack gap="0px" width="100%">
            <Box width="98%">
              {" "}
              <ListingHeader
                title={id}
                totalItems={totalItems}
                sort={sort}
                onSortChange={setSort}
              />{" "}
            </Box>
            <VStack>
              <Box width={products?.length > 0 ? "98%" : "100%"}  bg="white" padding="16px" margin="14px" borderRadius="5px" boxShadow="0px 2px 3px #e1e1e1">
                {/* <Flex flexWrap="wrap" justifyContent="center" gap="1rem" bg="white" padding="16px 0px" margin="14px" borderRadius="5px" boxShadow="0px 2px 3px #e1e1e1" width="98%"> */}

                  {Array.isArray(products) && products.length > 0 ? (
                    <>
                                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                  spacing="1rem">
                  {  products.map((p) => {
                      const firstSingle = Array.isArray(p.single_packs)
                        ? p.single_packs.find(
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

                      const discountPercent = actualPrice && discountedPrice ? Math.round( ((actualPrice - discountedPrice) / actualPrice) * 100) : null;

                      return (
                        <Link key={p.id} to={`/product-details/${p.id}`}>
                          <Box
                            key={p?.id}
                            bg={cardBg}
                            rounded="2xl"
                            shadow="0px 1px 3px #dddddd"
                            overflow="hidden"
                            position="relative"
                            transition="all 0.3s"
                            width="225px"
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
                                lineHeight="19px" overflow="hidden" textOverflow="ellipsis"
                                whiteSpace="nowrap">
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
                                      {" "}
                                      Save ₹
                                      {(actualPrice - discountedPrice).toFixed(
                                        2
                                      )}{" "}
                                    </Text>
                                  </HStack>
                                  <HStack justifyContent="space-between">
                                    <Text fontSize="14px" color="#4d4d4d">
                                      {" "}
                                      Size{" "}
                                    </Text>
                                    <Flex
                                      align="center"
                                      justify="space-between"
                                      px={4}
                                      py={1}
                                      gap={2}
                                      borderWidth="1px"
                                      borderRadius="lg"
                                      cursor="pointer"
                                      _hover={{ bg: "gray.100" }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleOpenModal(p);
                                      }}>
                                      <Text fontSize="14px" color="#4d4d4d">
                                        {firstSingle?.quantity_value}{" "}
                                        {firstSingle?.quantity_type}
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
                              ) : (
                                <Text color="red.400">
                                  Variant not available
                                </Text>
                              )}
                            </Box>
                          </Box>
                        </Link>
                      );
                    })}</SimpleGrid></>
                  ) : (
                    <Box width="98%">
                    <NoProducts clearFilters={clearFilters}/></Box>
                  )}
                
                {/* </Flex> */}
              </Box>

             {products.length > 0 && (
  <HStack mt={4}>
    <Button isDisabled={page === 1} onClick={() => setPage(p => p - 1)}>
      Prev
    </Button>
    <Button
      isDisabled={page * limit >= totalItems}
      onClick={() => setPage(p => p + 1)}
    >
      Next
    </Button>
  </HStack>
)}
            </VStack>
          </VStack>
        </HStack>
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
