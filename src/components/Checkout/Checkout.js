import React, { useContext, useState } from "react";
import {
  Box, VStack, HStack, FormControl, FormLabel, Input, Select,
  Button, Checkbox, SimpleGrid, Text, useToast,} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaLocationCrosshairs } from "react-icons/fa6";
import TopNavbar from "../Home/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { Config } from "../Utils/Config";
import axios from "axios";

export default function Checkout() {
  
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;
  const toast = useToast();

  // WATCH PINCODE FIELD
  const pincodeValue = watch("pincode");

  // AUTO FETCH LOCATION WHEN PINCODE REACHES 6 DIGITS
  const fetchLocationFromPincode = async (pincode) => {
    try {
      const response = await axios.get(
        `${Config?.get_city_state_from_pincode}/${pincode}`
      );

      if (response.status === 200 && response.data?.data) {
        const data = response.data.data;

        // Auto-fill form fields
        setValue("city", data.city || "");
        setValue("district", data.district || "");
        setValue("state", data.state || "");

        toast({
          title: "Location auto-filled",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid pincode",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Invalid or unserviceable pincode",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Trigger auto-fetch when pincode becomes 6 digits
  if (pincodeValue && pincodeValue.length === 6) {
    fetchLocationFromPincode(pincodeValue);
  }

  // ------------------- SUBMIT FUNCTION --------------------
  const onSubmit = async (formData) => {
    try {
      const payload = {
        userId: userId,
        name: formData.fullName,
        country_code: "+91",
        phone_number: formData.mobile,
        flat_no: formData.house,
        street_name: formData.street,
        pincode: formData.pincode,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        country: formData.country,
      };

      const response = await axios.post(Config?.add_delivery_address, payload);

      if (response.status === 200 || response.status === 201) {
        toast({
          description: "Address saved successfully.",
          isClosable: true,
          duration: 2000,
          status: "success",
        });
        reset();
      }
    } catch (error) {
      console.error("Address Save Error:", error);
      toast({
        title: "Something went wrong!",
        status: "error",
      });
    }
  };

  return (
    <>
      <TopNavbar />

      <Box bg="#f5f5f5" minH="100vh" py={10}>
        <Box maxW="700px" mx="auto" bg="white" p={8} borderRadius="md" boxShadow="md">
          
          <HStack justify="space-between" mb={6}>
            <Box>
              <Text fontSize="xl" fontWeight="bold">Delivery Address</Text>
              <Text fontSize="md" color="gray.500">Details</Text>
            </Box>

            <Button leftIcon={<FaLocationCrosshairs />} colorScheme="blue" size="sm">
              Use my location
            </Button>
          </HStack>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5} align="stretch">

              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input {...register("fullName")} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <HStack>
                  <Box px={3} py={2} border="1px solid #e2e8f0" borderRadius="md" bg="gray.50">+91</Box>
                  <Input {...register("mobile")} maxLength={10} />
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Flat / House No (If Any)</FormLabel>
                <Input {...register("house")} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Street / Area</FormLabel>
                <Input {...register("street")} />
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Pincode</FormLabel>
                  <Input {...register("pincode")} maxLength={6} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>City</FormLabel>
                  <Input {...register("city")} readOnly />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>District</FormLabel>
                  <Input {...register("district")} readOnly />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>State</FormLabel>
                  <Input {...register("state")} readOnly />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Landmark (Optional)</FormLabel>
                <Input {...register("landmark")} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Select defaultValue="India" {...register("country")}>
                  <option>India</option>
                </Select>
              </FormControl>

              <Checkbox colorScheme="green" {...register("save")}>
                Save this information for next time
              </Checkbox>

              <Button type="submit" bg="#2e8b57" color="white" size="lg" mt={4} _hover={{ bg: "#256f48" }}>
                Submit
              </Button>

            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
}
