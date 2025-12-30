import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Image,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box bg="#0e543f" color="gray.300" pt={14}>
      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 12 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
          
          {/* LEFT – ABOUT */}
          <Stack spacing={5}>
            <Text fontSize="2xl" fontWeight="700" color="green.400">
              CropX Genetic
            </Text>

            <Text fontSize="sm" lineHeight="1.8">
              CropX Genetic is a modern agricultural genetics and seed innovation
              company dedicated to delivering high-performance, climate-resilient
              crop solutions for Indian farmers. By combining advanced research,
              biotechnology, and field-tested genetics, CropX Genetic enables
              sustainable farming and higher productivity.
            </Text>

            <Text fontSize="sm" lineHeight="1.8">
              Our mission is to empower farmers with reliable, high-yield seed
              varieties that enhance crop quality, reduce risk, and support
              long-term agricultural growth.
            </Text>

            
          

            {/* Social Icons */}
            {/* <HStack spacing={4}>
              <Link><FaInstagram size={22} /></Link>
              <Link><FaFacebook size={22} /></Link>
              <Link><FaYoutube size={22} /></Link>
              <Link><FaXTwitter size={22} /></Link>
              <Link><FaLinkedin size={22} /></Link>
            </HStack> */}
          </Stack>

          {/* MIDDLE – QUICK LINKS */}
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="600" color="green.400">
              Quick Links
            </Text>

            <Link to="/pages/about-us">About Us</Link>
            {/* <Link>Reach Us</Link>
            <Link>Media Links</Link> */}
            <Link to="/pages/privacy-policy">Privacy Policy</Link>
            {/* <Link>Return & Refund Policy</Link> */}
            <Link to="/pages/terms-of-services">Terms of Service</Link>
            {/* <Link>Careers</Link>
            <Link>Shipping / Delivery Policy</Link> */}
            <Link to="/pages/faq">FAQ</Link>
            {/* <Link>Sitemap</Link> */}
          </Stack>

          {/* RIGHT – CONTACT */}
          <Stack spacing={5}>
            <Text fontSize="lg" fontWeight="600" color="green.400">
              Contact Us
            </Text>

            <Stack spacing={2}>
              <Text>Missed Call To Order:</Text>
              <Button
                bg="orange.400"
                color="white"
                w="fit-content"
                _hover={{ bg: "orange.500" }}
              >
              +91 9414570920
              </Button>
            </Stack>

            <Stack spacing={2}>
              <Text>Whatsapp:</Text>
              <Button
                bg="orange.400"
                color="white"
                w="fit-content"
                _hover={{ bg: "orange.500" }}
              >
                +91 9414570920
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Box>

      {/* BOTTOM BAR */}
      <Box
        mt={14}
        py={4}
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        textAlign="center"
      >
        <Text fontSize="sm">
          © {new Date().getFullYear()} CropX Genetic Private Limited. All rights
          reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
