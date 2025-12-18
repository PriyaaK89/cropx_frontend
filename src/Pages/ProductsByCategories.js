import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";
import ProductsByCategory from "../components/ProductCategory/ProductsbyCategory";

const ProductByCategoriesPage = ()=>{
    return(
        <>
         <VStack gap='0px'>
             <Box width='100%'><TopNavbar/></Box>
             <Box><ProductsByCategory/></Box>
        </VStack>
        </>
    )
}

export default ProductByCategoriesPage