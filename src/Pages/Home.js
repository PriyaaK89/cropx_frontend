import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";
import BannerSlider from "../components/Home/Slider";
import Categories from "../components/Home/Categories";
import Products from "../components/Home/Products";
import FeaturesBar from "../components/Home/FeaturesBar";

const Home = ()=>{
    return(
        <>
        <VStack gap='0px'>
            {/* <Box width='100%'> */}
                <TopNavbar/>
                {/* </Box> */}
            <Box><BannerSlider/></Box>
            <Box><Categories/></Box>
            <Box width='100%'><Products/></Box>
            <Box width={'100%'}><FeaturesBar/></Box>
        </VStack>
        </>
    )
}

export default Home