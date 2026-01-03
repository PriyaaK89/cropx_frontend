import { Box, Heading, Text } from "@chakra-ui/react";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const ShippingDeliveryInfo = () => {
  return (
    <>
    <TopNavbar/>
    <Box p={{ base: 5, md: 14 }}>
      <Heading fontSize="32px" color="black.400"  mb={6}>
        Delivery Policy
      </Heading>

      <Text mb={4} fontSize="16px" color="gray.700" fontWeight="600">
        Your order is expected to be delivered within{" "}
        <Text as="span" fontSize="16px" fontWeight="600"> 5–7 working days </Text>
        .
      </Text>

      <Text mb={2} fontSize="14px" color="gray.700">
        We offer free and paid shipping options for all orders delivered across
        India. Orders are usually dispatched within{" "}
        <Text as="span" fontSize="14px" fontWeight="medium">
          2–3 working days
        </Text>{" "}
        through our trusted courier partners.
      </Text>

      <Text mb={2} fontSize="14px" color="gray.700">
        Delivery timelines are indicative and may occasionally be delayed due to
        unavoidable circumstances beyond our control, such as force majeure
        events or other unforeseen situations affecting logistics or suppliers.
        In such cases, delivery timelines may be extended by a reasonable period.
      </Text>

      <Text fontSize="14px" color="gray.700">
        Orders containing multiple items may take additional time to be
        delivered depending on availability and shipment schedules.
      </Text>
    </Box>
    <Footer/>
    </>
  );
};

export default ShippingDeliveryInfo;
