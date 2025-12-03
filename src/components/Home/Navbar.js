import { Box, Flex, Input, InputGroup, InputRightElement, IconButton, HStack, Text, Button, Icon, Img, useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaTruck, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../images/Image_8i4oag8i4oag8i4o-removebg-preview.png";
import { Link } from "react-router-dom";
import CartDrawer from "../Cart/Cart";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export default function TopNavbar() {

  const {isOpen: isCartDrawerOpen, onOpen: onCartDrawerOpen, onClose: onCartDrawerClose} = useDisclosure();

  const handleCartDrawer = ()=>{
    onCartDrawerOpen()
  }
  const {cartItems} = useContext(CartContext);
  console.log(cartItems, "cartItemss")

  return (
    <>
    <CartDrawer isCartDrawerOpen={isCartDrawerOpen} onCartDrawerClose={onCartDrawerClose}/>
    <Box className="navbar" borderBottom="1px solid #e2e8f0" bg="white" px={10} py={3}>
      <Box width="100%">
        <Flex align="center" justify="space-between">
          {/* Left: Logo */}
          <Img src={logo} alt="logo" width="100px" />

          {/* Middle: Search Bar */}
          <Flex align="center" w="45%" >
            <InputGroup justifyContent='center' >
              <Input
                placeholder="Search products..." bg="white" border="1px solid #dcdcdc" borderRight="none" borderRadius="8px 0 0 8px" width="363px"
                _focus={{ borderColor: "orange.400", boxShadow: "none" }}
              />
              <InputRightElement width="50px" pointerEvents="none" />
              <IconButton aria-label="Search" icon={<SearchIcon />} bg="#4f8b4e" color="white" borderRadius="0 8px 8px 0"
                _hover={{ bg: "#4f8b4e" }}
              />
            </InputGroup>
          </Flex>

          {/* Right Section */}
          <HStack spacing={6}>

            {/* Track Order */}
            <HStack spacing={2} color="gray.500" cursor="pointer">
              <Icon as={FaTruck} boxSize={4} />
              <Text fontSize="sm" fontWeight="medium">
                Track Order
              </Text>
            </HStack>

            {/* Wishlist */}
            <HStack spacing={2} color="gray.500" cursor="pointer">
              <Icon as={FaHeart} boxSize={4} />
              <Text fontSize="sm" fontWeight="medium">
                Wishlist
              </Text>
            </HStack>

            {/* Login */}
           <Link to="/login"> <HStack spacing={2} color="gray.500" cursor="pointer">
              <Icon as={FaUser} boxSize={4} />
              <Text fontSize="sm" fontWeight="medium">
                Login
              </Text>
            </HStack> </Link>

            {/* Cart */}
            <Box position="relative" onClick={handleCartDrawer} cursor="pointer">
  <HStack spacing={2} color="gray.500">
    <Icon as={FaShoppingCart} boxSize={4} />
    <Text fontSize="sm" fontWeight="medium"> Cart </Text>
  </HStack>

  {/* Cart Badge */}
  {cartItems > 0 && (
    <Box
      position="absolute"
      top="-13px"
      right="22px"
      bg="red.500"
      color="white"
      fontSize="10px"
      fontWeight="bold"
      px={2}
      py="1px"
      borderRadius="full"
    >
      {cartItems}
    </Box>
  )}
</Box>
          </HStack>
        </Flex>
      </Box>
    </Box>
    </>
  );
}
