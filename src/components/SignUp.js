import { Box, Flex, Heading, Text, Input, Button, VStack, Checkbox, HStack, FormControl, FormLabel, useToast, FormErrorMessage} from "@chakra-ui/react";
import seedImg from "../images/growing_seed.png";
import { useState } from "react";
import axios from "axios";
import { Config } from "../components/Utils/Config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isDistributor: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const toast = useToast();

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (!name) return;

  const val = type === "checkbox" ? checked : value;

  setFormData((prev) => ({ ...prev, [name]: val }));

  // Remove errors only for text-based fields
  setErrors((prev) => {
    const newErrors = { ...prev };
    if (type !== "checkbox") {
      if (name === "email" && emailPattern.test(val)) delete newErrors.email;
      else if (typeof val === "string" && val.trim()) delete newErrors[name];
    }
    return newErrors;
  });
};

  
  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailPattern.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const res = await axios.post(`${Config?.Signup_url}`, formData);
      if (res.status === 201) {
        toast({
          title: res?.data?.message || "You have registered successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        
        setTimeout(() => {
        if (formData.isDistributor) {
          navigate("/distributor-request");
        } else {
          navigate("/login");
        }
      }, 2000);
      }
    } catch (error) {
      console.log("Signup Error:", error);
      toast({
        title: error?.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex bg="#bdd6c3" minH="100vh" align="center" justify="center" p="0">
      <Flex w="75%" maxW="1200px" bg="#bdd6c3" backdropFilter="blur(12px)" rounded="30px" overflow="hidden" boxShadow="0 0 35px rgba(0,0,0,0.4)">

        <Box flex="1">
          <Box w="100%" h="100%" bgImage={seedImg} bgSize="cover" bgPos="center" />
        </Box>

        <Flex flex="1" bg="#467b49d9" p="40px" direction="column" justify="center" color="white">
          
          <Heading mb="10px" textAlign="center" fontWeight="600">Sign Up</Heading>
          <Text fontSize="sm" mb="15px" textAlign="center" opacity=".8">Join CropX Platform</Text>

          <VStack spacing="10px" mb="15px" w="100%">
            <FormControl isInvalid={!!errors?.name}>
              <FormLabel color="white" marginBottom='1px' fontSize='13px'>Name</FormLabel>
              <Input name="name" bg="white" color="black" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
              <FormErrorMessage color='white' marginLeft='7px' marginTop="0px" fontSize='12px'>{errors?.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.email}>
              <FormLabel color="white" marginBottom='1px' fontSize='13px'>Email</FormLabel>
              <Input name="email" bg="white" color="black" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
              <FormErrorMessage color='white' marginLeft='7px' marginTop="0px" fontSize='12px'>{errors?.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.password}>
              <FormLabel color="white" marginBottom='1px' fontSize='13px'>Password</FormLabel>
              <Input name="password" bg="white" color="black" type="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
              <FormErrorMessage color='white' marginLeft='7px' marginTop="0px" fontSize='12px'>{errors?.password}</FormErrorMessage>
            </FormControl>
          </VStack>

          <Checkbox name="isDistributor" mb="25px" colorScheme="green" isChecked={formData.isDistributor} onChange={handleChange}>
            Are you a distributor?
          </Checkbox>

          <Button bg="#d6f5b3" color="black" size="lg" height='36px' rounded="full" fontWeight="600" _hover={{ bg:"#eaffcc" }} onClick={handleSignup}>
            Sign Up
          </Button>

          <HStack justify="flex-end" mt="10px" gap='0.2rem'>
            <Text fontSize="sm" opacity={0.7}>Already have an account?</Text>
            <Button variant="link" color="white" fontSize='14px' onClick={()=>navigate('/login')}>Login</Button>
          </HStack>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
