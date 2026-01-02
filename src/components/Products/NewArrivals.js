import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../Utils/Config";
import { Box, HStack, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const NewArrivals = ()=>{
 
    const [products , setProducts] = useState([]);
    const bg = useColorModeValue("#f4f6f9", "#f4f6f9");

    const getNewArrivals = async()=>{
        try{
             const response = await axios.get(`${Config?.get_new_arrivals}`);

             if(response?.status === 200){
                setProducts(response?.data?.data)
             }
        }catch(error){
            console.log(error, "Error in fetching API response.")
        }
    }

    useEffect(()=>{
        getNewArrivals();
    },[])

    return(
        <>
         <Box px={{base:1, md:4}} pt={2} pb={8} mt="1rem"  bg={bg}>
      {/* Header */}
      <HStack justify="space-between" px="2rem" py={4} mb="8px">
        <Text fontSize="18px" fontWeight={600} color="#4d4d4d">
            New Arrivals
        </Text>

        <Link to="/products/best-selling">
          <Text fontSize="11px" textDecoration="underline" cursor="pointer">
            View All
          </Text>
        </Link>
      </HStack>

      {/* Products */}
      <Box px={{base: 0,md:10}}>
        {products.length === 0 ? (
          <Text>No products found</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 2, sm: 2, md: 3, lg: 5 }}
            spacing={{base:"8px",md:"20px"}}
          >
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
        </>
    )
}

export default NewArrivals