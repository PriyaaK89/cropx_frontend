import { Box, Button, Img, Text, VStack } from "@chakra-ui/react";
import emptyBagImg from "../../images/Emptybag.png";

const NoProducts = ({clearFilters}) => {

  return (
    <Box minH="70vh" display="flex" alignItems="center" justifyContent="center" px={4} >
      <VStack gap="0px" textAlign="center">
        <Img src={emptyBagImg} alt="empty bag" maxW={{ base: "100px", md: "150px" }} mt={1} opacity={0.9} />

        <Text fontSize="14px" fontWeight="light" color="gray.500">  No Products </Text>
        <Text fontSize="18px" color="gray.600" mb={2}>Found</Text>

        <Text fontSize="13px" color="gray.500" maxW="300px" mb={0}> No Products Found. </Text>

        <Button color="green.800" fontWeight="light" bg="white" border="1px solid #edededff" boxShadow="1px 3px 3px #efefefff" px={10} mt={2} onClick={clearFilters}> Clear </Button>
      </VStack>
    </Box>
  );
};

export default NoProducts;
