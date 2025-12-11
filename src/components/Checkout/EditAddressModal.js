import { 
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  FormControl, FormLabel, Input, Button, HStack, Select, VStack, useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../Utils/Config";

const EditAddressModal = ({ isOpen, onClose, savedAddress, fetchOrders }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    country_code: "+91",
    phone_number: "",
    flat_no: "",
    street_name: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    landmark: "",
    country: "India",
    userId: ""
  });

  // Populate saved address when modal opens
  useEffect(() => {
    if (savedAddress && isOpen) {
      setFormData({
        name: savedAddress.name || "",
        country_code: savedAddress.country_code || "+91",
        phone_number: savedAddress.phone_number || "",
        flat_no: savedAddress.flat_no || "",
        street_name: savedAddress.street_name || "",
        pincode: savedAddress.pincode || "",
        city: savedAddress.city || "",
        district: savedAddress.district || "",
        state: savedAddress.state || "",
        landmark: savedAddress.landmark || "",
        country: savedAddress.country || "India",
        userId: savedAddress.user_id
      });
    }
  }, [savedAddress, isOpen]);

  // ⛔ VALIDATION FUNCTION
  const validateForm = () => {
    if (!formData.name.trim()) return "Full name is required";
    if (!/^[0-9]{10}$/.test(formData.phone_number)) return "Enter a valid 10-digit mobile number";
    if (!formData.street_name.trim()) return "Street/Area is required";
    if (!/^[0-9]{6}$/.test(formData.pincode)) return "Enter a valid 6-digit pincode";
    if (!formData.city.trim()) return "City is required";
    if (!formData.district.trim()) return "District is required";
    if (!formData.state.trim()) return "State is required";
    return null;
  };

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Auto-fetch state/city/district when pincode has 6 digits
    if (name === "pincode" && value.length === 6) {
      getStatebyPincode(value);
    }
  };

  // Get State/City/District by Pincode
  const getStatebyPincode = async (pincode) => {
    try {
      const response = await axios.get(`${Config?.get_city_state_from_pincode}/${pincode}`);

      if (response.status === 200 && response.data?.data) {
        const apiData = response.data.data;

        setFormData((prev) => ({
          ...prev,
          city: apiData.city || "",
          district: apiData.district || "",
          state: apiData.state || ""
        }));

        // toast({
        //   title: "Location auto-filled!",
        //   status: "success",
        //   duration: 2500,
        //   position: "top"
        // });
      } else {
        toast({
          title: "Invalid pincode",
          status: "error",
          duration: 2500,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: "Invalid or not serviceable pincode",
        status: "error",
        duration: 2500,
        position: "top"
      });
    }
  };

  // Update Address Handler
  const handleUpdateAddress = async () => {
    const errorMessage = validateForm();

    if (errorMessage) {
      toast({
        title: errorMessage,
        status: "error",
        duration: 2500,
        position: "top"
      });
      return;
    }

    try {
      const payload = { ...formData };

      const response = await axios.put(
        `${Config?.update_delivery_address}/${savedAddress?.id}`,
        payload
      );

      if (response.status === 200) {
        toast({
          title: "Address updated successfully!",
          status: "success",
          duration: 3000,
          position: "top"
        });

        onClose();
        fetchOrders();
      }
    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        toast({
          title: "Address not found",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      if (status === 500) {
        toast({
          title: "Server error, try again later",
          status: "error",
          duration: 3000,
          position: "top"
        });
        return;
      }

      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 3000,
        position: "top"
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalHeader py="6px" bg="#d8efdc" borderTopRadius="20px" fontWeight="bold" fontSize="18px">
          Edit Address
        </ModalHeader>

        <ModalCloseButton top={0} right={0} bg="#bb1111" borderRadius="0px 19px 0px 0px" padding="19px 25px" color="white"/>

        <ModalBody py={6}>
          <VStack spacing={4} align="stretch">
            
            {/* FULL NAME */}
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>

            {/* MOBILE */}
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <HStack>
                <Input value="+91" w="80px" isReadOnly />
                <Input name="phone_number" value={formData.phone_number} onChange={handleChange} maxLength={10}/>
              </HStack>
            </FormControl>

            {/* FLAT */}
            <FormControl>
              <FormLabel>Flat / House No</FormLabel>
              <Input name="flat_no" value={formData.flat_no} onChange={handleChange} />
            </FormControl>

            {/* STREET */}
            <FormControl isRequired>
              <FormLabel>Street / Area</FormLabel>
              <Input name="street_name" value={formData.street_name} onChange={handleChange} />
            </FormControl>

            {/* PINCODE + CITY */}
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Pincode</FormLabel>
                <Input 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleChange}
                  maxLength={6}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input name="city" value={formData.city} onChange={handleChange} readOnly />
              </FormControl>
            </HStack>

            {/* DISTRICT + STATE */}
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>District</FormLabel>
                <Input name="district" value={formData.district} onChange={handleChange} readOnly />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input name="state" value={formData.state} onChange={handleChange} readOnly />
              </FormControl>
            </HStack>

            {/* LANDMARK */}
            <FormControl>
              <FormLabel>Landmark</FormLabel>
              <Input name="landmark" value={formData.landmark} onChange={handleChange} />
            </FormControl>

            {/* COUNTRY */}
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Select name="country" value={formData.country} onChange={handleChange}>
                <option>India</option>
              </Select>
            </FormControl>

            {/* ACTION BUTTONS */}
            <HStack spacing={4} pt={4}>
              <Button flex={1} bg="#f7931e" color="white" onClick={onClose}>Cancel</Button>
              <Button flex={1} bg="#2a9a47" color="white" onClick={handleUpdateAddress}>Update</Button>
            </HStack>

          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditAddressModal;
