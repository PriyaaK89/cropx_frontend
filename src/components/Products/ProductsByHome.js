import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Config } from "../Utils/Config";
import { FaChevronDown, FaHeart } from "react-icons/fa";
import { HiPercentBadge } from "react-icons/hi2";
import ProductQuantityModal from "../Models/ProductQuantityModal";
import TopNavbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import CartDrawer from "../Cart/Cart";

const ProductByHomeCategories = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardBg = useColorModeValue("white", "gray.800");
  const priceColor = useColorModeValue("green.600", "green.300");

  const {
    isOpen: isQuantityModalOpen,
    onOpen: onQuantityModalOpen,
    onClose: onQuantityModalClose,
  } = useDisclosure();
    const {
      isOpen: isCartDrawerOpen,
      onOpen: onCartDrawerOpen,
      onClose: onCartDrawerClose,
    } = useDisclosure();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    onQuantityModalOpen();
  };
  const getProductsofHomeCategories = async () => {
    try {
      const response = await axios.get(Config.get_products_by_home_category);
      if (response.status === 200) {
        const allCategories = response.data.data;

        const selectedCategory = allCategories.find(
          (cat) => cat.id === Number(categoryId)
        );
        setProducts(selectedCategory?.products || []);
      }
    } catch (error) {
      console.log(error, "Error in fetching API response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsofHomeCategories();
  }, [categoryId]);

  if (loading) return <Text>Loading products...</Text>;

  return (
    <>
      {selectedProduct && (
        <ProductQuantityModal
          isQuantityModalOpen={isQuantityModalOpen}
          onQuantityModalClose={onQuantityModalClose}
          product={selectedProduct} onCartDrawerOpen={onCartDrawerOpen}
        />
      )}
            <CartDrawer
              isCartDrawerOpen={isCartDrawerOpen}
              onCartDrawerClose={onCartDrawerClose}
            />
      <TopNavbar />
      <Box px={10} my="3rem">
        {products.length === 0 ? (
          <Text>No products found for this category</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 5, xl: 5 }}
            spacing="1rem">
            {products.map((p) => {
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
                        lineHeight="19px"
                        overflow="hidden"
                        textOverflow="ellipsis"
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
                              Save ₹{(actualPrice - discountedPrice).toFixed(
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
                        <Text color="red.400">Variant not available</Text>
                      )}
                    </Box>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
        )}{" "}
      </Box>
      <Footer/>
    </>
  );
};

export default ProductByHomeCategories;
