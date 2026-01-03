import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";
import ProductsByCategory from "../components/ProductCategory/ProductsbyCategory";
import Footer from "../components/Home/Footer";

const ProductByCategoriesPage = ()=>{
    return(
        <>
         <VStack gap='0px'  backgroundColor="#f5f5f5">
          <Box position="sticky" top="0" left="0" bottom="0" right="0" zIndex={11} width='100%'>  <TopNavbar/> </Box>
             <Box w="100%"><ProductsByCategory/></Box>
             <Footer/>
        </VStack>
        </>
    )
}

export default ProductByCategoriesPage