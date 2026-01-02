import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserDrawer = ({ isOpen, onClose, handleLogout }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>My Account</DrawerHeader>

        <DrawerBody>
          <VStack align="stretch" spacing={4}>
            <Button as={Link} to="/order-history" onClick={onClose}>
              My Orders
            </Button>

            <Button as={Link} to="/my-address" onClick={onClose}>
              My Address
            </Button>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="red" w="100%" onClick={handleLogout}>
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
