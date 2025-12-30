import { Box, Flex, Text, Button, Image, HStack, VStack, Divider, Radio, RadioGroup, Badge, Icon, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../Utils/Config";
import { AuthContext } from "../Context/AuthContext";
import { PiSealPercentFill } from "react-icons/pi";
import EditAddressModal from "../Checkout/EditAddressModal";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const OrderSummary = () => {
    const { user } = useContext(AuthContext);
    const userId = user?.data?.id;
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {getCartItems} = useContext(CartContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleOpenModal = () => {
        onOpen();
    }

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${Config?.get_order_summary}/${userId}`);
            if (response?.status === 200) {
                setOrderData(response?.data);
            }
        } catch (error) {
            console.log(error, "Error in fetching API response.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchOrders();
    }, [userId]);

    useEffect(() => {
        if (orderData?.order_summary) {
            const grandTotal = orderData?.order_summary?.grand_total || 0;
            if (paymentMethod === "online") {
                setTotalPrice(grandTotal * 0.98); // 2% discount
            } else {
                setTotalPrice(grandTotal);
            }
        }
    }, [paymentMethod, orderData]);



    if (loading) {
        return (
            <Flex h="100vh" justify="center" align="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    const { order_summary, cart_products, delivery_address } = orderData;
    console.log(orderData?.delivery_address, "delivery_address")
    const discount = paymentMethod === "online" ? (order_summary?.grand_total * 0.02).toFixed(2) : 0;


    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
    try {
        // Load Razorpay SDK
        const res = await loadRazorpayScript();
        if (!res) {
            toast({
                description: "Razorpay SDK failed to load",
                status: "error",
            });
            return;
        }

        // 1. CREATE ORDER FROM BACKEND
        const orderResponse = await axios.post(`${Config?.create_order}`, {
             amount: Number(totalPrice)
        });

        if (!orderResponse?.data || !orderResponse?.data?.order_id) {
            toast({
                description: "Failed to create order!",
                status: "error",
            });
            return;
        }

        const { order_id, amount, currency } = orderResponse?.data;

        // 2. RAZORPAY OPTIONS
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount.toString(),
            currency,
            name: "CropX Genetic Store",
            description: "Order Payment",
            order_id: order_id,

            // 3. PAYMENT SUCCESS HANDLER
            handler: async function (response) {
                try {
                    // Verify payment
                    await axios.post(`${Config?.verifyPayment}`, response);

                    // Place order now
                    const placeOrderResponse = await axios.post(`${Config?.place_order}`, {
                        user_id: userId,
                        address_id: orderData?.delivery_address?.id,
                        payment_method: "ONLINE",
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id
                    });

                    if (placeOrderResponse?.status === 201) {
                        toast({
                            description: "Order Placed Successfully!",
                            status: "success",
                        });
                        setTimeout(()=>{
                            getCartItems()
                             navigate(`/order-success/${placeOrderResponse?.data?.order_id}`);
                        },1500)

                    }

                } catch (error) {
                    toast({
                        description: "Payment verified but order placement failed!",
                        status: "error",
                    });
                    console.log(error);
                }
            },

            // Prefill customer info
            prefill: {
                name: user?.data?.name,
                email: user?.data?.email,
                contact: user?.data?.phone,
            },

            theme: {
                color: "#0f9d58",
            },
        };

        // 4. OPEN RAZORPAY POPUP
        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
        console.log(error);
        toast({
            description: "Something went wrong!",
            status: "error",
        });
    }
};


    const handlePlaceOrder = async () => {
    try {
        const response = await axios.post(`${Config?.place_order}`, {
            user_id: userId,
            address_id: orderData?.delivery_address?.id,
            payment_method: "COD"
        });

        if (response.status === 201) {
            toast({
                description: "Order Placed Successfully!",
                status: "success",
            });
            setTimeout(() => {
                navigate(`/order-success/${response?.data?.order_id}`);
                getCartItems()
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
};



    return (
        <>
            <EditAddressModal isOpen={isOpen} onClose={onClose} savedAddress={orderData?.delivery_address} fetchOrders={fetchOrders} />
            <Flex bg="#f6f7f9" minH="100vh" p={6} gap={6}>
                <Box flex="2" bg="white" p={6} borderRadius="md" boxShadow="sm">
                    <HStack justify="center" mb={6}>
                        <Badge colorScheme="blue" px={4} py={1} borderRadius="full">  🔒 100% Secure</Badge>
                    </HStack>
                    <Flex border="1px solid #e2e8f0" p={4} borderRadius="md" justify="space-between" align="center">
                        <Box>
                            <Text fontWeight="bold">Deliver to :</Text>
                            <Text fontWeight="semibold">{delivery_address?.name}</Text>
                            <Text fontSize="sm" color="gray.600">
                                {delivery_address?.flat_no}, {delivery_address?.street_name},{" "}
                                {delivery_address?.city}, {delivery_address?.district},{" "}
                                {delivery_address?.state}, {delivery_address?.country} -{" "} {delivery_address?.pincode}
                            </Text>
                        </Box>
                        <Button variant="outline" colorScheme="green" onClick={handleOpenModal}> Change</Button>
                    </Flex>
                    <Text fontWeight="bold" mt={6} mb={3}> Select Payment Method </Text>
                    <RadioGroup value={paymentMethod} onChange={(val) => setPaymentMethod(val)}>
                        <VStack spacing={4} align="stretch">
                            {/* Online */}
                            <Flex bg={paymentMethod === "online" ? "green.500" : "gray.100"}
                                color={paymentMethod === "online" ? "white" : "black"} p={4} borderRadius="md" justify="space-between" align="center">
                                <HStack>
                                    <Radio value="online" colorScheme="whiteAlpha" />
                                    <Text fontWeight="bold">Pay Online (2% Discount)</Text>
                                </HStack>
                                <Box textAlign="right">
                                    {/* <Text fontWeight="bold" fontSize="lg">₹{paymentMethod === "online" ? totalPrice.toFixed(2) : order_summary?.grand_total}</Text> */}
                                    <Text fontWeight="bold" fontSize="lg">₹{paymentMethod === "online" ? totalPrice.toFixed(2) : totalPrice.toFixed(2)}</Text>
                                </Box>
                            </Flex>


                            {/* COD */}
                            <Flex bg={paymentMethod === "cod" ? "green.500" : "gray.100"}
                                color={paymentMethod === "cod" ? "white" : "black"} p={4} borderRadius="md" justify="space-between" align="center">
                                <HStack>
                                    <Radio value="cod" />
                                    <Text fontWeight="bold">Cash On Delivery (COD)</Text>
                                </HStack>
                                <Text fontWeight="bold">{Number(order_summary?.grand_total).toFixed(2)}</Text>
                            </Flex>

                        </VStack>
                    </RadioGroup>

                    {/* Footer Trust */}
                    <VStack mt={8} spacing={1}>
                        <Text color="gray.600">Trusted by over 2.5 Cr+ farmers</Text>
                        <HStack color="gray.500">
                            <Icon as={CheckIcon} />
                            <Text fontSize="sm">Secure Payment | Genuine Products</Text>
                        </HStack>
                    </VStack>
                </Box>

                {/* RIGHT SIDE */}
                <Box flex="1" bg="white" p={5} borderRadius="md" boxShadow="sm">
                    {/*  Dynamic Product List */}
                    <Box maxH="250px" overflowY="auto" pr={2}
                        css={{ "&::-webkit-scrollbar": { width: "6px" },
                            "&::-webkit-scrollbar-thumb": { background: "#cbd5e0", borderRadius: "10px"}
                        }}>
                        {cart_products?.map((product) => {
                            const singlePacks = product.single_packs || [];
                            const multiPacks = product.multi_packs || [];
                            return (
                                <Box key={product.product_id}>
                                    {/*  SINGLE PACKS */}
                                    {singlePacks.map((pack) => (
                                        <Flex key={pack.cart_item_id} align="center" mb={4} p={3} border="1px solid #e2e8f0" borderRadius="md">
                                            <Image src={product.product_img} boxSize="60px" objectFit="contain" mr={3} />

                                            <Box flex="1">
                                                <Text fontWeight="bold">
                                                    {product.product_name} - Single Pack
                                                </Text>

                                                <Text fontSize="sm" color="gray.600">
                                                    {pack.quantity_value}
                                                    {pack.quantity_type} | {product.product_description}
                                                </Text>

                                                <Flex justify="space-between" mt={1}>
                                                    <Text fontWeight="bold">₹{pack.discounted_price}</Text>
                                                    <Text fontSize="sm" color="gray.600">
                                                        Qty: {pack.cart_quantity}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    ))}

                                    {/*  MULTI PACKS */}
                                    {multiPacks.map((pack) => (
                                        <Flex key={pack.cart_item_id} align="center" mb={4} p={3} border="1px solid #e2e8f0" borderRadius="md">
                                            <Image src={product.product_img} boxSize="60px" objectFit="contain" mr={3} />

                                            <Box flex="1">
                                                <Text fontWeight="bold"> {product.product_name} - Multi Pack ({pack.pack_quantity} Pack) </Text>
                                                <Text fontSize="sm" color="gray.600"> Total: {pack.total_quantity_value} {pack.quantity_type} | {product.product_description}</Text>

                                                <Flex justify="space-between" mt={1}>
                                                    <Text fontWeight="bold">₹{pack.discounted_price}</Text>
                                                    <Text fontSize="sm" color="gray.600"> Qty: {pack.cart_quantity} </Text>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    ))}
                                </Box>
                            );
                        })}
                    </Box>

                    <Divider my={4} />

                    {/*  Billing Details */}
                    <Text fontWeight="bold" mb={3}> Billing Details </Text>

                    <VStack align="stretch" spacing={1}>
                        <Flex justify="space-between">
                            <Text fontSize="14px" color="#4d4d4d">Total Price</Text>
                            <Text fontSize="14px" color="#4d4d4d" >₹{Number(order_summary?.subtotal).toFixed(2)}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Text fontSize="14px" color="#4d4d4d">Shipping Charges</Text>
                            <Text fontSize="14px" color="#4d4d4d">₹{order_summary?.delivery_fee}</Text>
                        </Flex>
                        {paymentMethod === "online" && (
                            <Flex justify="space-between" color="red.500">
                                <Text fontSize="14px" color="red">Discount </Text>
                                <Text fontSize="14px" color="red">- ₹{discount}</Text>
                            </Flex>
                        )}
                        <Divider />

                        <Flex justify="space-between" fontWeight="bold">
                            <Text fontSize="14px" color="#2d2d2d">Net Price</Text>
                            <Text fontSize="14px" color="#2d2d2d">₹{Number(totalPrice).toFixed(2)}</Text>
                        </Flex>

                        <Box>
                            {paymentMethod === "online" && (<Box>
                                <Flex bg='#eef7f1' alignItems="center" padding="8px" borderRadius="5px" gap="4px" justifyContent="center"> <Box><PiSealPercentFill color="green" fontSize="18px" /></Box>  <Text color="green.500" fontSize="13px">You will save ₹{discount} on this order!</Text></Flex>
                            </Box>)}

                            <Flex pt="10px" justifyContent="space-between">
                                <Box>
                                    <Text fontSize="14px">₹{totalPrice.toFixed(2)}</Text>
                                    <Text fontSize="14px" fontWeight="600">Net Price</Text></Box>
                                <Box><Button  onClick={paymentMethod === "cod" ? handlePlaceOrder : handlePayment} bg="green" color="white" fontSize="14px" fontWeight="500" _hover={{ background: 'green.600' }}>
                                    {paymentMethod === "cod" ? "Place Order" : "Make Payment"}
                                    </Button></Box>
                            </Flex>
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};

export default OrderSummary;
