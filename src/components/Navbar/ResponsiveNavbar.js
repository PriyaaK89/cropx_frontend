import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../Cart/Cart";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaRegUser, FaRegUserCircle, FaUser } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import logo from "../../images/Image_8i4oag8i4oag8i4o-removebg-preview.png";
import { BsCart2 } from "react-icons/bs";
import UserDrawer from "./UserDrawer";
import LoginBottomDrawer from "./LoginBottomDrawer";

const ResponsiveNavbar = () => {
  const {
    isOpen: isCartDrawerOpen,
    onOpen: onCartDrawerOpen,
    onClose: onCartDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isUserDrawerOpen,
    onOpen: onUserDrawerOpen,
    onClose: onUserDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isLoginDrawerOpen,
    onOpen: onLoginDrawerOpen,
    onClose: onLoginDrawerClose,
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

  const handleProtectedAction = (action) => {
    if (!userId) {
      onLoginDrawerOpen();
      return;
    }
    action();
  };

  return (
    <>
      <CartDrawer
        isCartDrawerOpen={isCartDrawerOpen}
        onCartDrawerClose={onCartDrawerClose}
      />
      <UserDrawer
        isOpen={isUserDrawerOpen}
        onClose={onUserDrawerClose}
        handleLogout={handleLogout}
      />

      <LoginBottomDrawer
        isOpen={isLoginDrawerOpen}
        onClose={onLoginDrawerClose}
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
          px={3}
          py={3}>
          <Box width="100%">
            <Flex align="center" justify="space-between">
              <Link to="/">
                <Img src={logo} alt="logo" width="90px" cursor="pointer" />
              </Link>

              <HStack spacing={6}>
                {/* Wishlist */}
                <HStack
                  spacing={2}
                  color="gray.500"
                  cursor="pointer"
                  onClick={() =>
                    handleProtectedAction(() => navigate("/wishlist"))
                  }>
                  <Icon as={FaRegHeart} boxSize={5} />
                </HStack>

                <Box
                  position="relative"
                  cursor="pointer"
                  onClick={() => handleProtectedAction(handleCartDrawer)}>
                  <HStack spacing={2} color="gray.500">
                    <Icon as={BsCart2} boxSize={5} />
                  </HStack>
                  {userId && cartItems > 0 && (
                    <Box
                      position="absolute"
                      top="-11px"
                      right="-11px"
                      bg="#f28434"
                      color="white"
                      fontSize="10px"
                      fontWeight="bold"
                      px="5px"
                      py="1px"
                      borderRadius="full">
                      {cartItems}
                    </Box>
                  )}
                </Box>

                {userId ? (
                  <HStack
                    spacing={2}
                    cursor="pointer"
                    color="gray.500"
                    onClick={onUserDrawerOpen}>
                    <Icon as={FaRegUserCircle} boxSize={5} />
                  </HStack>
                ) : (
                  <Link to="/login">
                    <Button
                      backgroundColor="#527c59"
                      fontSize="13px"
                      fontWeight="500"
                      color="white"
                      height="23px">
                      Login
                    </Button>
                  </Link>
                )}
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResponsiveNavbar;
