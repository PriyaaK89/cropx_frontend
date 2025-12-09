import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Spinner,
  Heading,
  SimpleGrid,
  Divider,
  Card,
  Stack,
  Button,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Config } from "../Utils/Config";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getProductDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${Config?.Get_Product_Details}/${id}`);
      if (response?.status === 200) {
        const d = response?.data?.data;
        setData(d);

        const firstImg =
          d?.details?.images && d.details.images.length > 0
            ? d.details.images[0].src
            : d?.product_img;
        setSelectedImage(firstImg || null);

        const defVariant =
          (d?.single_packs && d.single_packs[0]) ||
          (d?.multi_packs && d.multi_packs[0]) ||
          null;
        setSelectedVariant(defVariant);
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
      toast({
        title: "Unable to fetch product details",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const handleAddToCart = (variant) => {
    console.log("Add to cart:", variant, "qty:", quantity);
    toast({
      title: "Added to cart",
      description: `${variant?.base_quantity_value || ""} added x${quantity}`,
      status: "success",
      duration: 2000,
    });
  };

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  if (loader || !data) {
    return (
      <Flex height={"80vh"} align={"center"} justify={"center"}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  const PriceBlock = ({ price, actual }) => (
    <HStack align="baseline" spacing={3}>
      <Text fontSize="2xl" fontWeight="bold">
        ₹{price}
      </Text>
      {actual && (
        <Text textDecoration="line-through" color="gray.500" fontSize="sm">
          ₹{actual}
        </Text>
      )}
    </HStack>
  );

  return (
    <Box bg="#f5f7fb" minH="100vh" py={8}>
      <Box maxW="1280px" mx="auto" px={4}>
        {/* ------------------ TOP SECTION: IMAGE + DETAILS ------------------ */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* LEFT: Images */}
          <Box>
            <Card borderRadius="2xl" shadow="xl" overflow="hidden" bg="white">
              <Image
                src={selectedImage || data?.product_img}
                alt={data?.product_name}
                objectFit="contain"
                w="100%"
                h={{ base: "320px", md: "420px" }}
                bg="white"
                p={6}
              />
            </Card>

            {/* thumbnails */}
            <SimpleGrid columns={{ base: 4, md: 4 }} spacing={3} mt={4}>
              {(data?.details?.images || [{ src: data?.product_img }]).map(
                (img, i) => (
                  <Card
                    key={i}
                    p={2}
                    cursor="pointer"
                    borderRadius="lg"
                    border={selectedImage === img.src ? "2px solid" : "1px solid"}
                    borderColor={selectedImage === img.src ? "blue.400" : "gray.200"}
                    onClick={() => setSelectedImage(img.src)}
                    bg="white"
                  >
                    <Image src={img.src} h="72px" objectFit="cover" />
                  </Card>
                )
              )}
            </SimpleGrid>
          </Box>

          {/* RIGHT: Details */}
          <Box>
            <Heading size="lg" fontWeight="bold" mb={2}>
              {data?.product_name}
            </Heading>

            <Badge colorScheme="blue" p={2} borderRadius="md" fontSize="sm" mb={3}>
              {data?.product_category}
            </Badge>

            <Text mt={2} color="gray.600" fontSize="md" lineHeight="tall">
              {data?.product_description}
            </Text>

            <Text mt={4} fontWeight="600" color="gray.700">
              Type: <span style={{ color: "#1a73e8" }}>{data?.product_type}</span>
            </Text>

            <Divider my={6} />

            {/* Single packs */}
            <Box mb={6}>
              <Heading size="md" mb={3}>
                Available Single Packs
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {data?.single_packs?.map((item) => (
                  <Card
                    key={item?.variant_id}
                    p={4}
                    shadow="md"
                    borderRadius="lg"
                    bg={selectedVariant === item ? "blue.50" : "white"}
                    cursor="pointer"
                    onClick={() => setSelectedVariant(item)}
                  >
                    <Stack spacing={2}>
                      <Text fontWeight="bold">
                        {item?.base_quantity_value} {item?.base_quantity_type}
                      </Text>
                      <PriceBlock
                        price={item?.total_discounted_price}
                        actual={item?.total_actual_price}
                      />
                      <HStack justify="space-between">
                        <Badge colorScheme="green" fontSize="0.8rem">
                          {item?.discount_percent}% OFF
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                        >
                          Add
                        </Button>
                      </HStack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            {/* Multipacks */}
            <Box>
              <Heading size="md" mb={3}>
                Multipack Options
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {data?.multi_packs?.map((mp) => (
                  <Card
                    key={mp?.multipack_id}
                    p={4}
                    shadow="md"
                    borderRadius="lg"
                    bg={selectedVariant === mp ? "purple.50" : "white"}
                    cursor="pointer"
                    onClick={() => setSelectedVariant(mp)}
                  >
                    <Stack spacing={2}>
                      <Text fontWeight="bold">
                        {mp?.pack_quantity} × {mp?.base_quantity_value}{" "}
                        {mp?.base_quantity_type}
                      </Text>
                      <Text color="gray.600">
                        Total Qty: <b>{mp?.total_quantity_value}</b>
                      </Text>
                      <PriceBlock
                        price={mp?.total_discounted_price}
                        actual={mp?.total_actual_price}
                      />
                      <HStack justify="space-between">
                        <Badge colorScheme="purple" fontSize="0.8rem">
                          {mp?.discount_percentage}% OFF
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(mp);
                          }}
                        >
                          Add
                        </Button>
                      </HStack>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        </SimpleGrid>

        {/* ------------------ BELOW: ORDER SUMMARY ------------------ */}
        <Box mt={8}>
          <Card p={5} borderRadius="2xl" shadow="lg" bg="white">
            <Stack spacing={4}>
              <Heading size="md">{data?.product_name}</Heading>
              <Text>
                {selectedVariant
                  ? `${selectedVariant?.base_quantity_value} ${selectedVariant?.base_quantity_type}`
                  : "Select a variant"}
              </Text>

              {selectedVariant && (
                <>
                  <PriceBlock
                    price={selectedVariant?.total_discounted_price}
                    actual={selectedVariant?.total_actual_price}
                  />
                  <HStack spacing={3} align="center">
                    <Text>Quantity</Text>
                    <NumberInput
                      size="sm"
                      maxW="120px"
                      min={1}
                      value={quantity}
                      onChange={(v) => setQuantity(Number(v))}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                  <Button colorScheme="blue" w="100%" onClick={() => handleAddToCart(selectedVariant)}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" w="100%" onClick={handleGoToCheckout}>
                    Go to Checkout
                  </Button>
                </>
              )}

              {!selectedVariant && <Text>Select a pack to proceed.</Text>}
            </Stack>
          </Card>

          {/* ------------------ SMALL INFO CARDS ------------------ */}
          <VStack spacing={3} mt={4} align="stretch">
            <Card p={4} bg="white" shadow="sm" borderRadius="lg">
              <Text fontWeight="600">Expert Advice</Text>
              <Text fontSize="sm" color="gray.600" mt={2}>
                {data?.details?.expert_advice?.[0]?.name || "No special advice provided."}
              </Text>
            </Card>

            <Card p={4} bg="white" shadow="sm" borderRadius="lg">
              <Text fontWeight="600">Additional Info</Text>
              <Text fontSize="sm" color="gray.600" mt={2}>
                {data?.details?.additional_information?.[0]?.name || "—"}
              </Text>
            </Card>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
