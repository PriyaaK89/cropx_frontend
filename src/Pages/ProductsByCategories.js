import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";

const ProductByCategoriesPage = ()=>{
    return(
        <>
         <VStack gap='0px'>
             <Box width='100%'><TopNavbar/></Box>
             
        </VStack>
        </>
    )
}

export default ProductByCategoriesPage