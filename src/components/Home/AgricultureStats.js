import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";

const AgricultureStats = () => {
  return (
    <Box
      w="100%"
      bg="#d9ebe4"  
      py={{ base: 10, md: 16 }}
      px={{ base: 6, md: 20 }}
    >

      <Text
        textAlign="center"
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="600"
        color="#55b16a"
        letterSpacing="widest"
        mb={12}
      >
        INDIA&apos;S LARGEST AGRICULTURE PLATFORM
      </Text>

      {/* Stats */}
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        spacing={{ base: 8, md: 15 }}
        textAlign="center"
      >
        <Flex direction="column" gap={2}>
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="#55b16a">
            400+
          </Text>
          <Text fontSize="lg" fontWeight="500" color="gray.800">
            Products
          </Text>
        </Flex>

        <Flex direction="column" gap={2}>
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="#55b16a">
            10M+
          </Text>
          <Text fontSize="lg" fontWeight="500" color="gray.800">
            Farmers Served
          </Text>
        </Flex>

        <Flex direction="column" gap={2}>
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="#55b16a">
            5K+
          </Text>
          <Text fontSize="lg" fontWeight="500" color="gray.800">
            Distributors
          </Text>
        </Flex>

        <Flex direction="column" gap={2}>
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="#55b16a">
            90%+
          </Text>
          <Text fontSize="lg" fontWeight="500" color="gray.800">
            Pincodes Served
          </Text>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default AgricultureStats;
