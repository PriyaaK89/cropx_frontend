import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import TopNavbar from "../components/Home/Navbar";
import BannerSlider from "../components/Home/Slider";
import Categories from "../components/Home/Categories";
import Products from "../components/Home/Products";
import FeaturesBar from "../components/Home/FeaturesBar";
import BestSelling from "../components/Products/BestSelling";
import NewArrivals from "../components/Products/NewArrivals";
import AgricultureStats from "../components/Home/AgricultureStats";
import Footer from "../components/Home/Footer";

const Home = ()=>{
    return(
        <>
        <VStack gap='0px'>
            {/* <Box width='100%'> */}
                <TopNavbar/>
                {/* </Box> */}
            <Box><BannerSlider/></Box>
            <Box><Categories/></Box>
            {/* <Box width='100%'><Products/></Box> */}
            <Box mt="2rem" width="100%"><BestSelling/></Box>
            <Box width={'100%'}><FeaturesBar/></Box>
            <Box mt="2rem" width="100%"><NewArrivals/></Box>
            <Box width="100%" my="3rem"><AgricultureStats/></Box>
            <Footer/>
        </VStack>
        </>
    )
}

export default Home