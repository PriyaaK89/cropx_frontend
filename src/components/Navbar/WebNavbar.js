import {
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  Img,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  useToast,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaTruck, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../../images/Image_8i4oag8i4oag8i4o-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartDrawer from "../Cart/Cart";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import SearchBar from "../SearchProducts/SearchBar";
import logoAvtar from "../../images/cropxIcon.png";
import MenuBar from "../Home/Menu";

export default function WebNavbar() {
  const {
    isOpen: isCartDrawerOpen,
    onOpen: onCartDrawerOpen,
    onClose: onCartDrawerClose,
  } = useDisclosure();

  const handleCartDrawer = () => {
    onCartDrawerOpen();
  };
  const { user, logout } = useContext(AuthContext);
  const userId = user?.data?.id;
  const { cartItems } = useContext(CartContext);
  console.log(cartItems, "cartItemss");
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const hideMenuBarRoutes = [
    "/pages/about-us",
    "/pages/privacy-policy",
    "/pages/terms-of-services",
    "/pages/faq",
  ];
  const hideMenuBar = hideMenuBarRoutes.includes(location.pathname);

  const handleLogout = () => {
    logout();
    toast({
      description: "You have logout successfully.",
      isClosable: true,
      duration: 2000,
      status: "success",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <CartDrawer
        isCartDrawerOpen={isCartDrawerOpen}
        onCartDrawerClose={onCartDrawerClose}
      />
      <Box
        position="sticky"
        top="0px"
        left="0px"
        bottom="0px"
        right="0px"
        zIndex={11}
        width="100%">
        <Box
          className="navbar"
          borderBottom="1px solid #e2e8f0"
          bg="white"
          px={10}
          py={3}>
          <Box width="100%">
            <Flex align="center" justify="space-between">
              <Link to="/">
                {/* <HStack> */} {/* <Img src={logoAvtar} width="30px"/> */}
                <Img
                  src={logo}
                  alt="logo"
                  width="100px"
                  cursor="pointer"
                />{" "}
                {/* </HStack> */}
              </Link>
              <Flex align="center" w="45%">
                <SearchBar />
              </Flex>
              {/* Right Section */}
              <HStack spacing={6}>
                <HStack spacing={2} color="gray.500" cursor="pointer">
                  <Icon as={FaTruck} boxSize={4} />
                  <Text fontSize="sm" fontWeight="medium">
                    {" "}
                    Track Order{" "}
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
                {userId ? (
                  <Menu>
                    <MenuButton>
                      <HStack spacing={2} cursor="pointer">
                        <Avatar size="sm" bg="green.500" />
                        <Text fontSize="sm" fontWeight="medium">
                          CropX Farmer
                        </Text>
                        <ChevronDownIcon />
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} to="/order-history">
                        My Orders{" "}
                      </MenuItem>
                      <MenuItem as={Link} to="/my-address">
                        {" "}
                        My Address{" "}
                      </MenuItem>
                      <MenuItem onClick={handleLogout} color="red.500">
                        {" "}
                        Logout{" "}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Link to="/login">
                    {" "}
                    <HStack spacing={2} color="gray.500" cursor="pointer">
                      <Icon as={FaUser} boxSize={4} />
                      <Text fontSize="sm" fontWeight="medium">
                        {" "}
                        Login{" "}
                      </Text>
                    </HStack>{" "}
                  </Link>
                )}

                {/* Cart */}
                <Box
                  position="relative"
                  onClick={handleCartDrawer}
                  cursor="pointer">
                  <HStack spacing={2} color="gray.500">
                    <Icon as={FaShoppingCart} boxSize={4} />
                    <Text fontSize="sm" fontWeight="medium">
                      {" "}
                      Cart{" "}
                    </Text>
                  </HStack>

                  {/* Cart Badge */}
                  {cartItems > 0 && (
                    <Box
                      position="absolute"
                      top="-13px"
                      right="22px"
                      bg="#f28434"
                      color="white"
                      fontSize="10px"
                      fontWeight="bold"
                      px={2}
                      py="1px"
                      borderRadius="full">
                      {cartItems}
                    </Box>
                  )}
                </Box>
              </HStack>
            </Flex>
          </Box>
        </Box>

        {!hideMenuBar && (
          <Box>
            <MenuBar />
          </Box>
        )}
      </Box>
    </>
  );
}
