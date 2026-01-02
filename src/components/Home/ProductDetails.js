import React, { useContext, useEffect, useState } from "react";
import { Box, Image, Text, Flex, Badge, Spinner, Heading, SimpleGrid, Card, Button, HStack, VStack, useToast, useDisclosure,} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Config } from "../Utils/Config";
import organic_icon from "../../images/organic_icon.png";
import price_tag from "../../images/price_tag.png";
import cash_on_delivery from "../../images/cod.png";
import origin_icon from "../../images/earth-location (1).png";
import inStock_icon from "../../images/express-delivery.png";
import secure_payment from "../../images/secured-payment.png";
import AdditionalDetails from "../Products/AdditionalDetailsOfProduct";
import BestSelling from "../Products/BestSelling";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import useCartQuantityManager from "../../hooks/userCartAction";
import LoginModal from "../Models/LoginModal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const { getCartItems, cartData } = useContext(CartContext);
  const { isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
  const userId = user?.data?.id;
  const { quantities, handleIncrease, handleDecrease, syncQuantitiesFromCart } =
    useCartQuantityManager({
      userId,
      product: data,
      cartData,
      getCartItems,
      onLoginModalOpen,
    });

  const currentKey = selectedVariant
  ? selectedVariant.variant_id
    ? `single_${selectedVariant.variant_id}`
    : `multi_${selectedVariant.multipack_id}`
  : null;

const currentQty = currentKey ? quantities[currentKey] || 0 : 0;

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

  useEffect(() => {
  if (data && cartData) {
    syncQuantitiesFromCart();
  }
}, [data, cartData, syncQuantitiesFromCart]);


  if (loader || !data) {
    return (
      <Flex height={"80vh"} align={"center"} justify={"center"}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }



  return (
    <>
      <LoginModal isLoginModalOpen={isLoginModalOpen} onLoginModalClose={onLoginModalClose}/>
      <Box bg="#FAFAFA" minH="100vh" py="24px">
        <Box maxW="1400px" mx="auto" px="16px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="40px">
            {/* ================= LEFT IMAGE SECTION ================= */}
            <Box
              bg="white"
              borderRadius="8px"
              border="1px solid #E0E0E0"
              p="16px">
              <Card boxShadow="none">
                <Image src={selectedImage || data?.product_img} h="350px" w="100%" objectFit="contain" />
              </Card>

              <HStack spacing="12px" mt="12px">
                {(data?.details?.images?.length
                  ? data.details.images
                  : [{ src: data?.product_img }]
                ).map((img, i) => (
                  <Box key={i} border="1px solid #E0E0E0" p="6px" borderRadius="4px" cursor="pointer" onClick={() => setSelectedImage(img.src)}>
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
                  <Box height="43px" display="flex" alignItems="end">
                    <Image src={price_tag} alt="Best Prices" width="65px" objectFit="contain"/>
                  </Box>
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
                <Heading fontSize="22px" fontWeight="600"> {data?.product_description} </Heading>
                <Text color="gray.600" fontSize="14px"> {data?.brand} </Text>

                {/* Rating */}
                <HStack mt="8px">
                  <HStack spacing="2px">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Text key={i} color="orange.400"> ★ </Text>
                      ))}
                  </HStack>
                  <Badge bg="black" color="white" fontSize="11px"> {data?.rating?.average} </Badge>
                  <Text color="green.500" fontSize="12px"> {data?.rating?.count} Reviews </Text>
                </HStack>

                {/* PRICE */}
                <HStack mt="16px" align="center">
                  <Text fontSize="12px" color="gray.600"> Price </Text>
                  <Text fontSize="18px" fontWeight="500"> ₹{selectedVariant?.discounted_price || "—"} </Text>
                  <Text textDecoration="line-through" color="gray.400" fontSize="14px">
                    ₹{selectedVariant?.actual_price}
                  </Text>
                  <Badge bg="#FFA726" color="white">
                    {selectedVariant?.discount_percent || selectedVariant?.discount_percentage}  % OFF
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

                <Text fontSize="sm" mt="4px"> Inclusive of all taxes</Text>
                <Text mt="16px" fontWeight="600" fontSize="14px"> Size</Text>

                {/* SINGLE PACK */}
                <HStack mt="8px">
                  {data?.single_packs?.map((item, index) => (
                    <Box
                      key={item.variant_id}
                      border="1px solid"
                      borderColor={
                        selectedVariant === item ? "#2E7D32" : "#E0E0E0"
                      }
                      _hover={{ bg: "#E8F5E9" }}
                      borderRadius="12px"
                      w="180px"
                      h="100px"
                      textAlign="center"
                      cursor="pointer"
                      bg={selectedVariant === item ? "#E8F5E9" : "white"}
                      onClick={() => setSelectedVariant(item)}>
                      <Badge bg="#FFA726" color="white" mb="8px" padding="0px 6px 2px" borderRadius="0px 0px 12px 12px">
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
                          <Text fontSize="13px" textDecoration="line-through" color="gray.400">
                            ₹{item.actual_price}
                          </Text>
                        </HStack>
                      </VStack>
                      {index === 0 && (
                        <Text color="purple.600" fontSize="sm" bg="#e1e0fa" borderRadius="0px 0px 12px 12px">
                          Best Seller
                        </Text>
                      )}
                    </Box>
                  ))}
                </HStack>

                {/* MULTIPACK */}
                <Text mt="24px" fontWeight="600" fontSize="14px">
                  Big Savings on Multipack
                </Text>

                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing="12px"
                  mt="12px">
                  {data?.multi_packs?.map((mp) => (
                    <Box
                      key={mp.multipack_id}
                      borderRadius="12px"
                      border="1px solid"
                      borderColor={
                        selectedVariant === mp ? "#2E7D32" : "#E0E0E0"
                      }
                      bg={selectedVariant === mp ? "#E8F5E9" : "white"}
                      _hover={{ bg: "#E8F5E9" }}
                      cursor="pointer"
                      textAlign="center"
                      onClick={() => setSelectedVariant(mp)}>
                      <Badge bg="#FFA726" color="white" mb="8px" padding="0px 6px 2px" borderRadius="0px 0px 12px 12px">
                        {mp.discount_percentage}% OFF
                      </Badge>
                      <VStack gap="4px" mb="4px">
                        <Text mt="6px" fontSize="14px">
                          {mp.total_quantity_value} kg (pack of{" "}
                          {mp.pack_quantity})
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
                    <HStack>
                      <Image
                        src={origin_icon}
                        alt="origin-in-india"
                        width="20px"
                      />
                      <Text mt="3px" fontSize="13px">
                        {" "}
                        Country of Origin: India
                      </Text>
                    </HStack>
                    <HStack>
                      <Image
                        src={secure_payment}
                        alt="origin-in-india"
                        width="20px"
                      />
                      <Text mt="3px" fontSize="13px">
                        {" "}
                        Secure Payments
                      </Text>
                    </HStack>
                    <HStack>
                      <Image src={inStock_icon} alt="origin-in-india" width="20px" />
                      <Text mt="3px" fontSize="13px">
                        In stock, Ready to Ship
                      </Text>
                    </HStack>
                  </Box>
                </Box>
              </Box>

              {/* CTA */}
              <HStack mt="24px">
  {currentQty === 0 ? (
    /* ADD TO CART */
    <Button
      flex="1"
      bg="#FF9F1C"
      color="#2d2d2dff"
      height={10}
      _hover={{ bg: "#f57b2c", color: "white" }}
      size="lg"
      fontSize="15px"
      fontWeight="600"
      onClick={() =>
        handleIncrease({
          variant_id: selectedVariant?.variant_id || null,
          multipack_id: selectedVariant?.multipack_id || null,
        })
      }
    >
      Add to Cart
    </Button>
  ) : (
    /* QUANTITY CONTROLS */
    <HStack
      flex="1"
      height={10}
      border="1px solid #E0E0E0"
      borderRadius="8px"
      overflow="hidden"
    >
      <Button
        variant="ghost"
        onClick={() =>
          handleDecrease({
            variant_id: selectedVariant?.variant_id || null,
            multipack_id: selectedVariant?.multipack_id || null,
          })
        }
      >
        −
      </Button>

      <Box flex="1" textAlign="center" fontWeight="600">
        {currentQty}
      </Box>

      <Button
        variant="ghost"
        onClick={() =>
          handleIncrease({
            variant_id: selectedVariant?.variant_id || null,
            multipack_id: selectedVariant?.multipack_id || null,
          })
        }
      >
        +
      </Button>
    </HStack>
  )}

  {/* BUY NOW */}
  <Button
    flex="1"
    bg="#2E7D32"
    height={10}
    fontSize="15px"
    color="white"
    _hover={{ bg: "#16601a" }}
    size="lg"
  >
    Buy Now
  </Button>
</HStack>

            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          {" "}
          <AdditionalDetails data={data} />{" "}
        </Box>
        <BestSelling />
      </Box>
    </>
  );
}
