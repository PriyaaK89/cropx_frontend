import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  HStack,
} from "@chakra-ui/react";
import seedImg from "../images/growing_seed.png";
import { useContext, useState } from "react";
import axios from "axios";
import { Config } from "./Utils/Config";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const Login = () => {
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
    else if (!emailPattern?.test(email))
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
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

  return (
    <Flex bg="#bdd6c3" minH="100vh" align="center" justify="center" p="0">
      <Flex
        w={{ base: "92%", sm: "92%", lg: "75%" }}
        maxW="1200px"
        bg="#bdd6c3"
        backdropFilter="blur(12px)"
        rounded="30px"
        overflow="hidden"
        boxShadow="0 0 35px rgba(0,0,0,0.4)">
        {/* LEFT IMAGE */}
        <Box
          flex="1"
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}>
          <Box
            w="100%"
            h="100%"
            bgImage={seedImg}
            bgSize="cover"
            bgPos="center"
          />
        </Box>

        {/* RIGHT FORM */}
        <Flex
          flex="1"
          bg="#467b49d9"
          p={{ base: "40px 20px", lg: "60px 40px" }}
          direction="column"
          justify="center"
          color="white">
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
                  fontSize="12px">
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
                  fontSize="12px">
                  {errors.password}
                </FormErrorMessage>
              )}
            </FormControl>
          </VStack>

          <Checkbox
            colorScheme="green"
            mb="18px"
            sx={{
              ".chakra-checkbox__label": {
                fontSize: { base: "14px", sm: "14px", md: "16px", lg: "16px" },
              },
            }}>
            Remember Me
          </Checkbox>

          <Button
            bg="#d6f5b3"
            color="black"
            size="lg" fontSize={{base: "15px",sm: "15px", md: "16px", lg: "16px"}}
            height="36px"
            rounded="full"
            fontWeight="600"
            _hover={{ bg: "#eaffcc" }}
            onClick={handleLogin}>
            Login
          </Button>
          <HStack mt="6px">
            <Text fontSize={{base: "14px",sm: "14px", md: "16px", lg: "16px"}}>Don't have an account?</Text>
            <Link to="/signup" style={{textDecoration: "underline"}}>
              <Text fontSize={{base: "14px",sm: "14px", md: "16px", lg: "16px"}}>Sign Up</Text>
            </Link>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
