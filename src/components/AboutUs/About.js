import {
  Box,
  Text,
  Heading,
  Stack,
  SimpleGrid,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import Footer from "../Home/Footer";
import TopNavbar from "../Home/Navbar";

const AboutUs = () => {
  return (
    <>
    <TopNavbar/>
    <Box bg="gray.50">
      {/* HERO SECTION */}
      <Box
        bg="green.700"
        color="white"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 20 }}
        textAlign="center"
      >
        <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
          About CropX Genetic
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="3xl" mx="auto">
          Advancing agriculture through innovative genetics, high-quality seeds,
          and farmer-first solutions.
        </Text>
      </Box>

      {/* ABOUT CONTENT */}
      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 20 }} py={16}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <Stack spacing={6}>
            <Heading size="lg" color="green.700">
              Who We Are
            </Heading>
            <Text lineHeight="1.8">
              CropX Genetic is an agriculture-focused genetics and seed innovation
              company committed to strengthening India’s farming ecosystem. We
              specialize in developing, sourcing, and delivering high-performance
              crop genetics that are climate-resilient, yield-efficient, and
              farmer-friendly.
            </Text>
            <Text lineHeight="1.8">
              By integrating modern agricultural research, biotechnology, and
              real-field insights, CropX Genetic empowers farmers to achieve
              sustainable productivity and long-term profitability.
            </Text>
          </Stack>

          <Stack spacing={6}>
            <Heading size="lg" color="green.700">
              What We Do
            </Heading>
            <Text lineHeight="1.8">
              We focus on providing superior seed genetics across multiple crop
              categories, ensuring quality, consistency, and performance. Our
              solutions are designed to adapt to diverse soil conditions,
              changing climates, and evolving agricultural challenges.
            </Text>
            <Text lineHeight="1.8">
              From research and development to farmer education and on-ground
              support, CropX Genetic works closely with the farming community to
              maximize crop potential and reduce cultivation risks.
            </Text>
          </Stack>
        </SimpleGrid>
      </Box>

      {/* MISSION & VISION */}
      <Box bg="white" py={16}>
        <Box maxW="7xl" mx="auto" px={{ base: 6, md: 20 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            <Stack spacing={5}>
              <Heading size="lg" color="green.700">
                Our Mission
              </Heading>
              <Text lineHeight="1.8">
                To empower farmers with advanced genetic solutions and reliable
                seed technologies that enhance productivity, improve crop
                quality, and promote sustainable agricultural practices.
              </Text>
            </Stack>

            <Stack spacing={5}>
              <Heading size="lg" color="green.700">
                Our Vision
              </Heading>
              <Text lineHeight="1.8">
                To become a trusted leader in agricultural genetics by driving
                innovation, supporting farmers’ livelihoods, and contributing to
                food security and environmental sustainability.
              </Text>
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>

      {/* WHY CHOOSE US */}
      <Box bg="gray.100" py={16}>
        <Box maxW="7xl" mx="auto" px={{ base: 6, md: 20 }}>
          <Heading textAlign="center" color="green.700" mb={12}>
            Why Choose CropX Genetic
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {[
              "Advanced Seed Genetics",
              "Farmer-Centric Approach",
              "Quality & Consistency",
              "Sustainable Agriculture",
            ].map((item) => (
              <Box
                key={item}
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                textAlign="center"
              >
                <Text fontWeight="600">{item}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* IMPACT STATS */}
      <Box bg="green.50" py={16}>
        <Box maxW="7xl" mx="auto" px={{ base: 6, md: 20 }}>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} textAlign="center">
            <Stack>
              <Heading color="green.700">10K+</Heading>
              <Text>Farmers Empowered</Text>
            </Stack>
            <Stack>
              <Heading color="green.700">100+</Heading>
              <Text>Seed Varieties</Text>
            </Stack>
            <Stack>
              <Heading color="green.700">15+</Heading>
              <Text>States Covered</Text>
            </Stack>
            <Stack>
              <Heading color="green.700">95%</Heading>
              <Text>Farmer Satisfaction</Text>
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>

      {/* CTA */}
      <Box bg="green.700" color="white" py={16} textAlign="center" mb="4rem">
        <Heading mb={4}>Growing the Future Together</Heading>
        <Text mb={6} maxW="2xl" mx="auto">
          Join CropX Genetic in transforming agriculture through innovation,
          trust, and farmer-first solutions.
        </Text>
        <Button colorScheme="orange" size="lg">
          Contact Us
        </Button>
      </Box>
    </Box>
    <Footer/>
    </>
  );
}

export default AboutUs;