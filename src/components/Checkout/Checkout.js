import React from "react";
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Checkout Data:", data);
  };

  return (
    <Box
      maxW="700px"
      mx="auto"
      mt={6}
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">

          <Text fontSize="2xl" fontWeight="bold">
            Checkout Details
          </Text>

          <FormControl>
            <FormLabel>Company Name (optional)</FormLabel>
            <Input placeholder="Company" {...register("company")} />
          </FormControl>

          <FormControl isInvalid={errors.country} isRequired>
            <FormLabel>Country / Region</FormLabel>
            <Select
              placeholder="Select Country"
              {...register("country", { required: "Country is required" })}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </Select>
            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.street} isRequired>
            <FormLabel>Street Address</FormLabel>
            <Input
              placeholder="House no. & street name"
              {...register("street", { required: "Street address is required" })}
            />
            <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
          </FormControl>

          <HStack>
            <FormControl isInvalid={errors.city} isRequired>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.state} isRequired>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="State"
                {...register("state", { required: "State is required" })}
              />
              <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl isInvalid={errors.zip} isRequired>
              <FormLabel>ZIP Code</FormLabel>
              <Input
                placeholder="Postal Code"
                {...register("zip", { required: "ZIP is required" })}
              />
              <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phone} isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Phone Number"
                {...register("phone", { required: "Phone is required" })}
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={errors.email} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <Divider />

          <Button colorScheme="teal" type="submit">
            Continue to Payment
          </Button>
        </VStack>
      </form>
    </Box>
  );
}