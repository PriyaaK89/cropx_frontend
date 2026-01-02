import {
  Box,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../Utils/Config";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);


  const getCategories = async () => {
    try {
      const response = await axios.get(`${Config?.get_home_categories}`);
      if (response?.status === 200) {
        setCategories(response?.data?.data);
        console.log(response?.data?.data, "CategoriesData");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error, "Something went wrong.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Box mt="3rem" textAlign="center" px={{ base: 4, md: 10 }}>
      <Box marginBottom='2rem'>
        <Text fontFamily='Inter-SemiBold' fontSize={{base: "16px",md:"20px"}} color="#4d4d4d" fontWeight="500" mb="10px">
          Categories
        </Text>
        <Divider orientation="horizontal" borderColor='#b1aeae' />
      </Box>

      <SimpleGrid
        columns={{ base: 3, md: 6 }}
        spacing={{ base: 4, md: 10 }}
        justifyItems="center">
        {categories.map((cat, index) => (
          <Link key={cat?.id} to={`/product-by-categories/${cat?.id}`}>
          <VStack key={index} spacing={3} >
            <Box
              w={{ base: "90px", md: "140px" }}
              h={{ base: "90px", md: "140px" }}
              borderRadius="full"
              overflow="hidden"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
              <Image
                src={cat.image}
                alt={cat.title}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
            <Text fontSize={{ base: "sm", md: "14px" }} fontWeight="500">
              {cat.title}
            </Text>
          </VStack>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
