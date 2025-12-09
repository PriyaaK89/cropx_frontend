import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../Utils/Config";
import { Box, useToast } from "@chakra-ui/react";

const ProductsByCategory = () => {
  const { id } = useParams();
  console.log(id, "id");

  const [categorisedProducts, setCategorisedProducts] = useState([]);
  const toast = useToast();

  const fetchProductsByCategories = async () => {
    try {
      const response = await axios.get(
        `${Config?.get_product_by_categories}/${id}`
      );
      if (response?.status === 200) {
        setCategorisedProducts(response?.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong while fetching products.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
 
  useEffect(()=>{
    fetchProductsByCategories()
  },[]);

  return(
    <>
    <Box>
        
    </Box>
    </>
  )
};

export default ProductsByCategory;
