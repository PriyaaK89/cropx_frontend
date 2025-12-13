import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import seedImg from "../../images/growing_seed.png";
import { Config } from "../Utils/Config";
import axios from "axios";

const LoginModal = ({isLoginModalOpen, onLoginModalClose})=>{
     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [errors, setErrors] = useState({ email: "", password: "" });
      const toast = useToast();
      const navigate = useNavigate();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const { login } = useContext(AuthContext);
    
      const handleLogin = async () => {
        // Validate input fields
        let newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!emailPattern.test(email))
          newErrors.email = "Enter a valid email.";
        if (!password.trim()) newErrors.password = "Password is required.";
        setErrors(newErrors);
    
        // If any error exists, stop here
        if (Object.keys(newErrors).length > 0) return;
    
        try {
          const data = { email, password };
          const res = await axios.post(`${Config?.Login_url}`, data);
    
          if (res?.status === 200) {
            toast({
              title: "Login Successful",
              description: res?.data?.message,
              duration: 2000,
              status: "success",
              isClosable: true,
            });
            const userData = {
              token: res.data.token,
              data: res.data.user,
            };
    
            login(userData);
           onLoginModalClose();
          }
    
          console.log("Login Response:", res.data);
        } catch (error) {
          console.log("Login Error:", error);
          toast({
            title: error?.response?.data?.message || "Login failed",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      };
    
      // Handle field input and remove error while typing
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: "" });
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: "" });
      };
    return(
        <>
      <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose} size="md" isCentered>
      <ModalOverlay />

      <ModalContent
        bg="transparent"
        boxShadow="none"
        maxW="900px"
        overflow="hidden"
      >
        <ModalBody p="0">
          {/* Your Login UI Inside Modal */}
          <Flex bg="#bdd6c3" align="center" justify="center" p="0" rounded="30px">
            <Flex
              w="100%" bg="#bdd6c3" backdropFilter="blur(12px)" rounded="30px" overflow="hidden" boxShadow="0 0 35px rgba(0,0,0,0.4)" >
              {/* LEFT IMAGE */}
              <Box flex="1">
                <Box w="100%" h="100%" bgImage={seedImg} bgSize="cover" bgPos="center"/>
              </Box>

              {/* RIGHT SIDE FORM */}
              <Flex flex="1" bg="#467b49d9" p="60px 40px" direction="column" justify="center" color="white">
                <Heading mb="10px" textAlign="center" fontWeight="600">
                  Login
                </Heading>
                <Text fontSize="sm" mb="15px" textAlign="center" opacity=".8">
                  Access CropX Platform
                </Text>

                <VStack spacing="10px" mb="18px" w="100%">
                  <FormControl isInvalid={errors.email}>
                    <FormLabel color="white" mb="1px" fontSize="13px">
                      Email
                    </FormLabel>
                    <Input
                      bg="white"
                      color="black"
                      placeholder="Enter Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {errors.email && (
                      <FormErrorMessage
                        color="white"
                        marginLeft="7px"
                        marginTop="0px"
                        fontSize="12px"
                      >
                        {errors.email}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.password}>
                    <FormLabel color="white" mb="1px" fontSize="13px">
                      Password
                    </FormLabel>
                    <Input
                      bg="white"
                      color="black"
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {errors.password && (
                      <FormErrorMessage
                        color="white"
                        marginLeft="7px"
                        marginTop="0px"
                        fontSize="12px"
                      >
                        {errors.password}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </VStack>

                <Checkbox colorScheme="green" mb="18px" fontSize="sm">
                  Remember Me
                </Checkbox>

                <Button
                  bg="#d6f5b3"
                  color="black"
                  size="lg"
                  height="36px"
                  rounded="full"
                  fontWeight="600"
                  _hover={{ bg: "#eaffcc" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
        </>
    )
}

export default LoginModal