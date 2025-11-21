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

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Config?.Get_Categories}`);
      if (response?.status === 200) {
        setCategories(response?.data?.categories);
        console.log(response?.data?.categories, "CategoriesData");
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
        <Text fontFamily='Inter-SemiBold' fontSize="20px" color="#4d4d4d" fontWeight="500" mb="10px">
          Categories
        </Text>
        <Divider orientation="horizontal" borderColor='#b1aeae' />
      </Box>

      <SimpleGrid
        columns={{ base: 3, md: 6 }}
        spacing={{ base: 6, md: 0 }}
        justifyItems="center">
        {categories.map((cat, index) => (
          <VStack key={index} spacing={3}>
            <Box
              w={{ base: "90px", md: "140px" }}
              h={{ base: "90px", md: "140px" }}
              borderRadius="full"
              overflow="hidden"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
              <Image
                src={cat.image}
                alt={cat.cate_name}
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
            <Text fontSize={{ base: "sm", md: "14px" }} fontWeight="500">
              {cat.cate_name}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
