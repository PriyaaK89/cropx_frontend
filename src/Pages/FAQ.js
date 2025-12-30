import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const faqData = [
  {
    q: "What is CropX Farmer?",
    a: "CropX Farmer is an online platform that provides high-quality agricultural products and solutions to farmers. Our goal is to support better farming practices through reliable products and services.",
  },
  {
    q: "How do I create an account?",
    a: "You can create an account by clicking on the Login or Register option and providing your basic details such as name, phone number, and email address.",
  },
  {
    q: "Do I need an account to place an order?",
    a: "Yes, creating an account helps us manage your orders, delivery details, and order history more efficiently.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept secure online payments through trusted payment gateways, including UPI, debit cards, credit cards, and net banking. We do not store your payment details.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery timelines vary based on location and product availability. Estimated delivery details are shown during checkout and order confirmation.",
  },
  {
    q: "Can I track my order?",
    a: "Yes, once your order is shipped, you can track it from the My Orders section using the tracking details provided.",
  },
  {
    q: "What is your return or refund policy?",
    a: "Returns and refunds are subject to our Return & Refund Policy. Products must meet eligibility criteria mentioned on the product page or policy section.",
  },
  {
    q: "Is my personal information secure?",
    a: "Yes. We use industry-standard security measures, including encryption and secure servers, to protect your personal data.",
  },
  {
    q: "How can I contact customer support?",
    a: "You can contact us via email at support@cropxfarmer.com or call our support number during business hours.",
  },
];

const FAQ = () => {
  return (
    <>
      <TopNavbar />

      {/* Header Section */}
      <Box
        bgGradient="linear(to-r, green.600, green.600)"
        py={{ base: 14, md: 20 }}
        textAlign="center"
        color="white"
      >
        <Container maxW="5xl">
          <Heading size="lg" mb={3}>
            Frequently Asked Questions
          </Heading>
          <Text fontSize="md" opacity={0.95}>
            Everything you need to know about orders, payments, delivery, and
            support at CropX Farmer.
          </Text>
        </Container>
      </Box>

      {/* FAQ Content */}
      <Box bg="gray.50" py={{ base: 10, md: 16 }}>
        <Container maxW="4xl">
          <VStack spacing={6} align="stretch">
            <Accordion allowToggle>
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  bg="white"
                  borderRadius="lg"
                  mb={4}
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                >
                  <AccordionButton p={5}>
                    <Flex flex="1" textAlign="left" direction="column">
                      <Text fontWeight="500" fontSize="15px" color="gray.800">
                        {item.q}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel
                    px={5}
                    pb={5}
                    fontSize="15px"
                    color="gray.600"
                    lineHeight="1.8"
                  >
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <Divider />

            {/* Support CTA */}
            <Box textAlign="center" pt={6}>
              <Text fontSize="15px" color="gray.600">
                Still have questions?
              </Text>
              <Text fontWeight="600" color="green.600">
                Contact our support team — we’re here to help.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default FAQ;
