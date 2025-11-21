import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Config } from "../components/Utils/Config";

const DistributorFormPage = () => {
  const [formData, setFormData] = useState({
    seed_license: "",
    fertilizer_license: "",
    pesticide_license: "",
    gst_number: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Validation Before Submit
  const validateFields = () => {
    const { seed_license, fertilizer_license, pesticide_license, gst_number } = formData;

    if (!gst_number.trim()) {
      toast({
        title: "GST Number is required.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }

    if (
      !seed_license.trim() &&
      !fertilizer_license.trim() &&
      !pesticide_license.trim()
    ) {
      toast({
        title: "Please enter at least one license number.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  // 🔹 Submit Form
  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);

      const userId = 2; 

      const payload = {
        userId,
        gst_number: formData.gst_number.trim(),
        seed_license: formData.seed_license.trim(),
        fertilizer_license: formData.fertilizer_license.trim(),
        pesticide_license: formData.pesticide_license.trim(),
      };

      await axios.post(`${Config?.DistributorRequest_url}`, payload);

      toast({
        title:
          "Your request has been sent and our team will verify you when approved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Optional redirect after success
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Error submitting distributor request:", error);
      toast({
        title: error?.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex bg="#bdd6c3" minH="100vh" align="center" justify="center" p="0">
      <Box
        w="480px"
        bg="#467b49d9"
        backdropFilter="blur(12px)"
        border="1px solid rgba(255,255,255,0.14)"
        rounded="30px"
        p="50px 35px"
        color="white"
        boxShadow="0 0 32px rgba(0,0,0,0.45)"
      >
        <Heading fontSize="28px" mb="30px" textAlign="center" fontWeight="600">
          Distributor Registration
        </Heading>

        <VStack spacing="18px" mb="30px">
          <FormControl>
            <FormLabel color="white" fontSize="13px" mb="2px">
              Seed License Number
            </FormLabel>
            <Input
              name="seed_license"
              bg="white"
              color="black"
              placeholder="Enter Seed License Number"
              height="36px"
              value={formData.seed_license}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white" fontSize="13px" mb="2px">
              Fertilizer License Number
            </FormLabel>
            <Input
              name="fertilizer_license"
              bg="white"
              color="black"
              placeholder="Enter Fertilizer License Number"
              height="36px"
              value={formData.fertilizer_license}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white" fontSize="13px" mb="2px">
              Pesticide License Number
            </FormLabel>
            <Input
              name="pesticide_license"
              bg="white"
              color="black"
              placeholder="Enter Pesticide License Number"
              height="36px"
              value={formData.pesticide_license}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white" fontSize="13px" mb="2px">
              GST Number
            </FormLabel>
            <Input
              name="gst_number"
              bg="white"
              color="black"
              placeholder="Enter GST Number"
              height="36px"
              value={formData.gst_number}
              onChange={handleChange}
            />
          </FormControl>
        </VStack>

        <Button
          w="100%"
          height="36px"
          bg="#d6f5b3"
          color="black"
          rounded="full"
          fontWeight="600"
          size="lg"
          _hover={{ bg: "#eaffcc" }}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Send For Approval
        </Button>
      </Box>
    </Flex>
  );
};

export default DistributorFormPage;
