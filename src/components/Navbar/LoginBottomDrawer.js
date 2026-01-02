import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginBottomDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="16px" p={4}>
        <DrawerBody>
          <VStack spacing={4}>
            <Text fontSize="16px" fontWeight="600">
              Please login to Cropx
            </Text>

            <Text fontSize="13px" color="gray.500" textAlign="center">
              Login to view your cart, wishlist and orders
            </Text>

            <Button
              colorScheme="green"
              w="100%"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
            >
              Login
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginBottomDrawer;
