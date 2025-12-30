import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";
import ProductsByCategory from "../components/ProductCategory/ProductsbyCategory";

const ProductByCategoriesPage = ()=>{
    return(
        <>
         <VStack gap='0px'  backgroundColor="#f5f5f5">
            <TopNavbar/>
             <Box w="100%"><ProductsByCategory/></Box>
        </VStack>
        </>
    )
}

export default ProductByCategoriesPage