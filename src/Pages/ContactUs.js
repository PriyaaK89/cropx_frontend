import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Icon,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Config } from "../components/Utils/Config";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { FaClock } from "react-icons/fa";
import { MdCall, MdEmail, MdLocationOn } from "react-icons/md";

const ContactUs = () => {
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact_no: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.contact_no || !form.message) {
      toast({
        title: "All required fields must be filled",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({ title: "Invalid email address", status: "error" });
      return false;
    }

    if (form.contact_no.length !== 10) {
      toast({ title: "Contact number must be 10 digits", status: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post(`${Config?.contact_us}`, form);

      toast({
        title: "Message sent successfully",
        description: "Our team will contact you shortly.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setForm({
        name: "",
        email: "",
        contact_no: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <TopNavbar/>
    <Box bg="gray.50" py={{ base: 10, md: 20 }}>
      <Container maxW="6xl">
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading>Contact Us</Heading>
          <Text color="gray.600" maxW="600px">
            Have a question about Cropx products, orders, or farming solutions?
            Fill out the form below and our support team will get back to you.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Contact Info */}
       <VStack
  align="start"
  spacing={6}
  bg="white"
  p={6}
  borderRadius="lg"
  boxShadow="sm"
  border="1px solid"
  borderColor="gray.200"
>
  <Heading size="md">Get in touch</Heading>

  <Text color="gray.600" fontSize="sm">
    Our Cropx support team is always ready to assist farmers with
    product guidance, order help, and technical support.
  </Text>

  {/* Email */}
  <HStack spacing={4}>
    <Box
      bg="blue.50"
      p={3}
      borderRadius="full"
      color="blue.600"
    >
      <MdEmail />
    </Box>
    <Box>
      <Text fontWeight="medium">Email us</Text>
      <Text fontSize="sm" color="gray.600">
        cropxgenetic@gmail.com
      </Text>
    </Box>
  </HStack>

  {/* Phone */}
  <HStack spacing={4}>
    <Box
      bg="blue.50"
      p={3}
      borderRadius="full"
      color="blue.600"
    >
      <MdCall />
    </Box>
    <Box>
      <Text fontWeight="medium">Call support</Text>
      <Text fontSize="sm" color="gray.600">
        +91 9414570920
      </Text>
    </Box>
  </HStack>

  {/* Support Hours */}
  <HStack spacing={4}>
    <Box
      bg="blue.50"
      p={3}
      borderRadius="full"
      color="blue.600"
    >
      <FaClock />
    </Box>
    <Box>
      <Text fontWeight="medium">Support hours</Text>
      <Text fontSize="sm" color="gray.600">
        Mon – Sat (10:00 AM – 5:00 PM)
      </Text>
    </Box>
  </HStack>
  <HStack spacing={4}>
    <Box
      bg="blue.50"
      p={2}
      borderRadius="full"
      color="blue.600"
    >
      <MdLocationOn  fontSize="22px"/>
    </Box>
    <Box>
      <Text fontWeight="medium">Corporate Office</Text>
      <Text fontSize="sm" color="gray.600">
        S-19, 2nd Floor, Agrasen Tower, Vidhyadhar nagar, Jaipur, Rajasthan, IN 302039
      </Text>
    </Box>
  </HStack>
</VStack>


          {/* Contact Form */}
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    name="contact_no"
                    type="tel"
                    value={form.contact_no}
                    onChange={handleChange}
                    placeholder="Enter Contact Number"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject (optional)"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here"
                    rows={4}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="green"
                  width="full"
                  isLoading={loading}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
    <Footer/>
    </>
  );
};

export default ContactUs;