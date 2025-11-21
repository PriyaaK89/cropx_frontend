import React, { useEffect, useState } from "react";
import { Box, Image, Text, Flex, Badge, Spinner, Heading, SimpleGrid, Divider, Card, CardBody, Stack, Button} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Config } from "../Utils/Config";

const ProductDetails = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);

  const getProductDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${Config?.Get_Product_Details}/${id}`);

      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loader || !data) {
    return (
      <Flex height={"80vh"} align={"center"} justify={"center"}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return (
  <Box bg="#f5f7fb" minH="100vh" py={8}>
    <Box maxW="1280px" mx="auto" p={4}>

      {/* ------------------ TOP SECTION ------------------ */}
      <Flex
        gap={10}
        flexDir={{ base: "column", md: "row" }}
        align={"flex-start"}
      >
        {/* LEFT IMAGE PANEL (STICKY) */}
        <Box
          w={{ base: "100%", md: "40%" }}
          position="sticky"
          top="90px"
        >
          <Card
            borderRadius="2xl"
            shadow="xl"
            overflow="hidden"
            bg="white"
          >
            <Image
              src={data?.product_img}
              alt={data?.product_name}
              objectFit="contain"
              w="100%"
              h="380px"
              bg="white"
              p={6}
            />
          </Card>
        </Box>

        {/* RIGHT PANEL */}
        <Box flex="1">
          <Heading size="lg" fontWeight="bold" mb={2}>
            {data?.product_name}
          </Heading>

          <Badge
            colorScheme="blue"
            p={2}
            borderRadius="md"
            fontSize="sm"
            mb={3}
          >
            {data?.product_category}
          </Badge>

          <Text mt={2} color="gray.600" fontSize="md" lineHeight="tall">
            {data?.product_description}
          </Text>

          <Text mt={4} fontWeight="600" color="gray.700">
            Type: <span style={{ color: "#1a73e8" }}>{data?.product_type}</span>
          </Text>

          <Divider my={6} />

          {/* ---------- SINGLE PACK SECTION ---------- */}
          <Box>
            <Heading size="md" mb={3}>
              Available Single Packs
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {data?.single_packs?.map((item) => (
                <Card
                  key={item?.variant_id}
                  p={5}
                  shadow="lg"
                  borderRadius="2xl"
                  bg="white"
                  _hover={{ shadow: "xl", transform: "scale(1.01)" }}
                  transition="0.2s"
                >
                  <Stack spacing={3}>
                    <Text fontWeight="bold" fontSize="lg">
                      {item?.base_quantity_value} {item?.base_quantity_type}
                    </Text>

                    <Flex gap={3} align="center">
                      <Text fontSize="2xl" fontWeight="bold" color="green.600">
                        ₹{item?.total_discounted_price}
                      </Text>
                      <Text
                        textDecoration="line-through"
                        color="gray.500"
                        fontSize="sm"
                      >
                        ₹{item?.total_actual_price}
                      </Text>
                    </Flex>

                    <Badge colorScheme="green" fontSize="0.8rem">
                      {item?.discount_percent}% OFF
                    </Badge>

                    <Button colorScheme="blue" mt={3} size="sm" borderRadius="full">
                      Add to Cart
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Divider my={8} />

          {/* ---------- MULTIPACK SECTION ---------- */}
          <Box>
            <Heading size="md" mb={3}>
              Multipack Options
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {data?.multi_packs?.map((mp) => (
                <Card
                  key={mp?.multipack_id}
                  p={5}
                  shadow="lg"
                  borderRadius="2xl"
                  bg="white"
                  _hover={{ shadow: "xl", transform: "scale(1.01)" }}
                  transition="0.2s"
                >
                  <Stack spacing={3}>
                    <Text fontWeight="bold" fontSize="lg">
                      {mp?.pack_quantity} Packs × {mp?.base_quantity_value}{" "}
                      {mp?.base_quantity_type}
                    </Text>

                    <Text color="gray.600">
                      Total Quantity: <b>{mp?.total_quantity_value}</b>
                    </Text>

                    <Flex gap={3} align="center">
                      <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                        ₹{mp?.total_discounted_price}
                      </Text>
                      <Text
                        textDecoration="line-through"
                        color="gray.500"
                        fontSize="sm"
                      >
                        ₹{mp?.total_actual_price}
                      </Text>
                    </Flex>

                    <Badge colorScheme="purple" fontSize="0.8rem">
                      {mp?.discount_percentage}% OFF
                    </Badge>

                    <Button colorScheme="purple" mt={3} size="sm" borderRadius="full">
                      Add Multipack
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>

      {/* ------------------ PRODUCT DETAILS SECTIONS ------------------ */}
      <Box mt={14}>
        
        {/* ---- SECTION HEADING STYLE ---- */}
        <Box borderLeft="4px solid #4c6fff" pl={3} mb={5}>
          <Heading size="md">Product Images</Heading>
        </Box>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={5}>
          {data?.details?.images?.map((img, i) => (
            <Card key={i} shadow="lg" borderRadius="xl" overflow="hidden">
              <Image src={img.src} h="150px" objectFit="cover" />
            </Card>
          ))}
        </SimpleGrid>

        {/* PRODUCT OVERVIEW */}
        <Box borderLeft="4px solid #4c6fff" pl={3} mt={12} mb={5}>
          <Heading size="md">Product Overview</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {data?.details?.product_overview?.map((p, i) => (
            <Card key={i} p={4} shadow="md" borderRadius="xl" bg="white">
              <Text>{p?.name}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* BENEFITS */}
        <Box borderLeft="4px solid #4c6fff" pl={3} mt={12} mb={5}>
          <Heading size="md">Key Features & Benefits</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {data?.details?.key_features_and_benefits?.map((b, i) => (
            <Card key={i} p={4} shadow="md" borderRadius="xl" bg="white">
              <Text>{b?.name}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* EXPERT ADVICE */}
        <Box borderLeft="4px solid #4c6fff" pl={3} mt={12} mb={5}>
          <Heading size="md">Expert Advice</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {data?.details?.expert_advice?.map((e, i) => (
            <Card key={i} p={4} shadow="md" borderRadius="xl" bg="white">
              <Text>{e?.name}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* ADDITIONAL INFO */}
        <Box borderLeft="4px solid #4c6fff" pl={3} mt={12} mb={5}>
          <Heading size="md">Additional Information</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {data?.details?.additional_information?.map((a, i) => (
            <Card key={i} p={4} shadow="md" borderRadius="xl" bg="white">
              <Text>{a?.name}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  </Box>
);

};

export default ProductDetails;
