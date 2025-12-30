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
  useToast,
  Wrap,
  WrapItem,
  Tag,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Config } from "../Utils/Config";
import organic_icon from "../../images/organic_icon.png"
import price_tag from "../../images/price_tag.png"
import cash_on_delivery from "../../images/cod.png"
import origin_icon from "../../images/earth-location (1).png"
import inStock_icon from "../../images/express-delivery.png"
import secure_payment from "../../images/secured-payment.png"

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
    <Box bg="#FAFAFA" minH="100vh" py="24px">
      <Box maxW="1400px" mx="auto" px="16px">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="40px">
          {/* ================= LEFT IMAGE SECTION ================= */}
          <Box bg="white"
            borderRadius="8px"
            border="1px solid #E0E0E0"
            p="16px" >
            <Card boxShadow="none"
            >
              <Image
                src={selectedImage || data?.product_img}
                h="350px"
                w="100%"
                objectFit="contain"
              />
            </Card>

            <HStack spacing="12px" mt="12px">
              {(data?.details?.images?.length
                ? data.details.images
                : [{ src: data?.product_img }]
              ).map((img, i) => (
                <Box
                  key={i}
                  border="1px solid #E0E0E0"
                  p="6px"
                  borderRadius="4px"
                  cursor="pointer"
                  onClick={() => setSelectedImage(img.src)}>
                  <Image src={img.src} h="60px" objectFit="contain" />
                </Box>
              ))}
            </HStack>

            {/* TRUST BADGES */}
            <HStack justify="space-between" mt="24px">
              <VStack gap={0}>
                <Image src={organic_icon} alt="100% Original" width="40px" />
                <Text fontSize="14px">100% Original</Text>
              </VStack>
              <VStack gap={0}>
                <Box height="43px" display="flex" alignItems="end"> <Image src={price_tag} alt="Best Prices" width="65px" objectFit="contain" /> </Box>
                <Text fontSize="14px">Best Prices</Text>
              </VStack>
              <VStack gap={0}>
                <Image src={cash_on_delivery} alt="Cash On Delivery" width="50px" />
                <Text fontSize="14px">Cash On Delivery</Text>
              </VStack>
            </HStack>
          </Box>

          {/* ================= RIGHT DETAILS ================= */}
          <Box>
            <Box height="500px" overflowY="scroll">
              <Heading fontSize="22px" fontWeight="600">
                {data?.product_description}
              </Heading>

              <Text color="gray.600" fontSize="14px">
                {data?.brand}
              </Text>

              {/* Rating */}
              <HStack mt="8px">
                <HStack spacing="2px">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Text key={i} color="orange.400">
                        ★
                      </Text>
                    ))}
                </HStack>
                <Badge bg="black" color="white" fontSize="11px">
                  {data?.rating?.average}
                </Badge>
                <Text color="green.500" fontSize="12px">{data?.rating?.count} Reviews</Text>
              </HStack>

              {/* PRICE */}
              <HStack mt="16px" align="center">
                <Text fontSize="12px" color="gray.600">Price</Text>
                <Text fontSize="18px" fontWeight="500">
                  ₹{selectedVariant?.discounted_price || "—"}
                </Text>
                <Text
                  textDecoration="line-through"
                  color="gray.400"
                  fontSize="14px">
                  ₹{selectedVariant?.actual_price}
                </Text>
                <Badge bg="#FFA726" color="white">
                  {selectedVariant?.discount_percent ||
                    selectedVariant?.discount_percentage}
                  % OFF
                </Badge>
              </HStack>

              <Text color="green.600" mt="4px">
                Save ₹
                {selectedVariant
                  ? (
                    selectedVariant.actual_price -
                    selectedVariant.discounted_price
                  ).toFixed(2)
                  : ""}
              </Text>

              <Text fontSize="sm" mt="4px">
                Inclusive of all taxes
              </Text>

              {/* SIZE */}
              <Text mt="16px" fontWeight="600" fontSize="14px">
                Size
              </Text>

              {/* SINGLE PACK */}
              <HStack mt="8px">
                {data?.single_packs?.map((item) => (
                  <Box
                    key={item.variant_id}
                    border="1px solid"
                    borderColor={
                      selectedVariant === item ? "#2E7D32" : "#E0E0E0"
                    }
                    borderRadius="12px"
                    // p="12px"
                    w="180px"
                    textAlign="center"
                    cursor="pointer"
                    bg={selectedVariant === item ? "#E8F5E9" : "white"}
                    onClick={() => setSelectedVariant(item)}>
                    <Badge
                      bg="#FFA726"
                      color="white"
                      mb="8px"
                      padding="0px 6px 2px"
                      borderRadius="0px 0px 12px 12px">
                      {item.discount_percent}% OFF
                    </Badge>
                    <VStack gap="4px" mb="4px">
                      <Text fontWeight="500" fontSize="14px">
                        {item.base_quantity_value} kg
                      </Text>
                      <HStack justifyContent="center">
                        <Text fontWeight="700" fontSize="14px">
                          ₹{item.discounted_price}
                        </Text>
                        <Text
                          fontSize="13px"
                          textDecoration="line-through"
                          color="gray.400">
                          ₹{item.actual_price}
                        </Text>
                      </HStack>
                    </VStack>
                    <Text
                      color="purple.600"
                      fontSize="sm"
                      bg="#e1e0fa"
                      borderRadius="0px 0px 12px 12px">
                      Best Seller
                    </Text>
                  </Box>
                ))}
              </HStack>

              {/* MULTIPACK */}
              <Text mt="24px" fontWeight="600" fontSize="14px">
                Big Savings on Multipack
              </Text>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="12px" mt="12px">
                {data?.multi_packs?.map((mp) => (
                  <Box
                    key={mp.multipack_id}
                    border="1px solid #E0E0E0"
                    borderRadius="12px"
                    // p="12px"
                    cursor="pointer"
                    textAlign="center"
                    bg="white"
                    onClick={() => setSelectedVariant(mp)}>
                    <Badge
                      bg="#FFA726"
                      color="white"
                      mb="8px"
                      padding="0px 6px 2px"
                      borderRadius="0px 0px 12px 12px">
                      {mp.discount_percentage}% OFF
                    </Badge>
                    <VStack gap="4px" mb="4px">
                      <Text mt="6px" fontSize="14px">
                        {mp.total_quantity_value} kg (pack of {mp.pack_quantity}
                        )
                      </Text>
                      <HStack justifyContent="center">
                        <Text fontWeight="700" fontSize="14px">
                          ₹{mp.discounted_price}
                        </Text>
                        <Text
                          fontSize="sm"
                          textDecoration="line-through"
                          color="gray.400">
                          ₹{mp.actual_price}
                        </Text>{" "}
                      </HStack>
                    </VStack>
                    <Text color="purple.600" fontSize="sm">
                      Value Pack
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>

              {/* DELIVERY INFO */}
              <Box mt="24px" borderTop="1px solid #E0E0E0" pt="16px">
                {/* <Text fontWeight="600">Deliver to Jaipur, 302021</Text>
                <Text mt="6px"> Delivery by Wed, 07 Jan</Text> */}
                <Box>
                  <HStack><Image src={origin_icon} alt="origin-in-india" width="20px"/><Text mt="3px" fontSize="13px"> Country of Origin: India</Text></HStack>
                  <HStack><Image src={secure_payment} alt="origin-in-india" width="20px"/><Text mt="3px" fontSize="13px"> Secure Payments</Text></HStack>
                  <HStack><Image src={inStock_icon} alt="origin-in-india" width="20px"/><Text mt="3px" fontSize="13px">
                    In stock, Ready to Ship
                  </Text></HStack>
                </Box>
              </Box>
            </Box>

            {/* CTA */}
            <HStack mt="24px">
              <Button
                flex="1"
                bg="#FF9F1C"
                color="black"
                size="lg"
                onClick={() => handleAddToCart(selectedVariant)}>
                Add to Cart
              </Button>
              <Button
                flex="1"
                bg="#2E7D32"
                color="white"
                size="lg"
                onClick={handleGoToCheckout}>
                Buy Now
              </Button>
            </HStack>
          </Box>
        </SimpleGrid>
      </Box>

      <Box mt="40px">
        <Stack spacing="32px">
          <Card p="24px" borderRadius="12px">
            <Heading fontSize="18px" mb="16px">
              Product Overview
            </Heading>

            <Wrap spacing="12px">
              {data?.details?.product_overview?.map((item, i) => (
                <WrapItem key={i}>
                  <Tag
                    size="lg"
                    bg="#F1F5F9"
                    color="#1F2937"
                    borderRadius="full"
                    px="16px"
                    py="8px">
                    {item.name}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Card>
          <Card p="24px" borderRadius="12px" bg="#F9FAFB">
            <Heading fontSize="18px" mb="16px">
              Key Features & Benefits
            </Heading>

            <VStack align="start" spacing="14px">
              {data?.details?.key_features_and_benefits?.map((item, i) => (
                <HStack align="start" key={i} spacing="12px">
                  <Box
                    bg="#E8F5E9"
                    color="#2E7D32"
                    borderRadius="full"
                    boxSize="28px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold">
                    ✓
                  </Box>

                  <Text fontSize="15px" color="#374151">
                    {item.name}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Card>
          <Card p="24px" borderRadius="12px" border="1px solid #E5E7EB">
            <HStack mb="16px" spacing="10px">
              <Box fontSize="20px">👨‍🌾</Box>
              <Heading fontSize="18px">Expert Advice</Heading>
            </HStack>

            <VStack align="start" spacing="12px">
              {data?.details?.expert_advice?.map((item, i) => (
                <HStack key={i} align="start" spacing="10px">
                  <Box color="#2E7D32" mt="2px">
                    ●
                  </Box>
                  <Text fontSize="15px" color="#374151">
                    {item.name}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Card>
          <Card p="24px" borderRadius="12px" bg="#FFF7ED">
            <Heading fontSize="18px" mb="16px">
              Additional Information
            </Heading>

            <VStack align="start" spacing="12px">
              {data?.details?.additional_information?.map((item, i) => (
                <HStack key={i} spacing="10px" align="start">
                  <Box color="#FB923C">⚠️</Box>
                  <Text fontSize="15px" color="#374151">
                    {item.name}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
