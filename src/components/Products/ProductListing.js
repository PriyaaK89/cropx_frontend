import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../Utils/Config";
import { Box, SimpleGrid, Text, useColorModeValue,} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import TopNavbar from "../Home/Navbar";

const ProductListing = () => {
  const { type } = useParams(); // best-selling | new-arrivals
  const [products, setProducts] = useState([]);
  const bg = useColorModeValue("#f4f6f9", "#f4f6f9");

  const getProducts = async () => {
    try {
      let apiUrl = "";

      if (type === "best-selling") {
        apiUrl = Config.get_best_selling_products;
      } else if (type === "new-arrivals") {
        apiUrl = Config.get_new_arrivals_products;
      }

      const res = await axios.get(apiUrl);
      if (res.status === 200) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [type]);

  return (
    <>
    <TopNavbar/>
    <Box px={10} py={6} bg={bg} minH="100vh">
      <Text fontSize="20px" fontWeight="600" mb={6}>
        {type === "best-selling"
          ? "Best Selling Products"
          : "New Arrivals"}
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="1rem">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default ProductListing;
