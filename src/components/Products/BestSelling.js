import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../Utils/Config";
import {
  Box,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";


const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const bg = useColorModeValue("#f4f6f9", "#f4f6f9");

  const getBestSellingProducts = async () => {
    try {
      const res = await axios.get(Config.get_best_selling_products);
      if (res.status === 200) {
        setProducts(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching best selling products", error);
    }
  };

  useEffect(() => {
    getBestSellingProducts();
  }, []);

  return (
    <Box px={4} pt={2} pb={8} mt="1rem" bg={bg}>
      {/* Header */}
      <HStack justify="space-between" px="2rem" py={4} mb="8px">
        <Text fontSize="18px" fontWeight={600} color="#4d4d4d">
          Best Selling
        </Text>

        <Link to="/products/best-selling">
          <Text fontSize="11px" textDecoration="underline" cursor="pointer">
            View All
          </Text>
        </Link>
      </HStack>

      {/* Products */}
      <Box px={10}>
        {products.length === 0 ? (
          <Text>No products found</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
            spacing="20px"
          >
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default BestSelling;
