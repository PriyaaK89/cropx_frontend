import {
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
  Box,
  UnorderedList,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const ReturnRefundPolicy = () => {
  return (
    <>
      <TopNavbar />
      <Box  bg="white" p={{ base: 5, md: 14 }}>
        <VStack align="start" spacing={6}>
          <Heading fontSize="32px" color="black.400">
            Return & Refund Policy
          </Heading>

          <Text fontSize="14px" color="gray.700" >
            At <strong>Cropx</strong>, we aim to deliver quality agricultural
            products and ensure customer satisfaction. Please review our policy
            below.
          </Text>
          <Text fontSize="14px" color="gray.700">
            Cropx does not accept returns after the product has been delivered.
            However, if you receive a wrong item, a damaged product, or an
            expired item, you can request an exchange. We will replace the
            product at no extra cost, subject to product availability in our
            stock.
          </Text>

          <Heading fontSize="18px">Exchange Policy</Heading>
          <Text fontSize="14px" color="gray.700">
            Once the product is delivered, we do not accept returns. However, if
            you receive a wrong product, a damaged item, an expired product, or
            a defective item, you can request an exchange. We will replace the
            product free of cost, depending on stock availability.
          </Text>

          <Heading fontSize="18px">Exceptions & Rules</Heading>
          <List spacing={3} >
            {[
              "The product must be unused and returned in its original condition with all labels and packaging intact. Items that are opened, broken, or tampered with will not be accepted.",
              "Exchange is possible only if your delivery address is serviceable by our delivery partner",
              "If the product includes a free gift or offer, all free items must also be returned. If any free item is missing, its price may be deducted",
              "If you choose to send the product back yourself, please pack it properly to avoid damage. We suggest using a reliable courier service.",
              "Perishable products like seeds and flowers cannot be returned or exchanged if the packet is opened or damaged.",
              "Products must be returned within 07 days from the day of delivery",
              "To process any complaints regarding the product, the customer needs to send the unboxing video of the package at our mobile no. +91-9414570920",
              "The issues related to the delivered product should be raised within 2 days of the delivery",
            ].map((item, index) => (
              <ListItem key={index} fontSize="14px" color="gray.700">
                {item}
              </ListItem>
            ))}
          </List>
          <Text fontSize="14px" fontWeight="600" color="gray.700">
            To complete your return, we require a receipt or proof of purchase.
          </Text>
          <Heading fontSize="18px">Refunds</Heading>
          <Text fontSize="14px" color="gray.700">
            {" "}
            Once we receive your returned product, our team will check it. After
            inspection, we will send you an email to confirm that we have
            received the item. We will also inform you whether your refund
            request has been approved or rejected.{" "}
          </Text>
          <Text fontSize="14px" color="gray.700">
            {" "}
            If your refund is approved, the amount will be returned to your
            original payment method (such as credit card, debit card, or UPI).
            The refund will be processed within 7 to 10 working days.{" "}
          </Text>
          <Text fontSize="14px" color="gray.700">
            {" "}
            Cropx may cancel an order fully or partially in certain situations,
            such as when a product is out of stock, due to unexpected events
            beyond our control, suspected fraud, violation of our Terms of Use,
            or delivery-related issues. In such cases, any prepaid amount will
            be refunded according to our Return and Refund Policy.{" "}
          </Text>

          <Heading fontSize="18px">Order Cancellation</Heading>
          <Text fontSize="14px" color="gray.700">
            Cropx reserves the right to cancel orders due to product
            unavailability, logistics issues, force majeure, or suspected fraud.
            Prepaid orders will be refunded as per policy.
          </Text>

          <Box>
            <Heading fontSize="18px" fontWeight="600" mb={2}> Late or Missing Refunds </Heading>

            <Text mb={2} fontSize="14px" color="gray.700">
              If you have not received your refund yet, please follow these
              steps:
            </Text>

            <UnorderedList pl={5} spacing={1} fontSize="14px" color="gray.700">
              <ListItem>Check your bank account again.</ListItem>
              <ListItem>
                Contact your credit card company, as it may take some time for
                the refund to be posted.
              </ListItem>
              <ListItem>
                Contact your bank, as there is often a processing delay before
                the refund appears.
              </ListItem>
              <ListItem>
                If you have completed all the above steps and still have not
                received your refund, please contact us for assistance.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading fontSize="18px"  mb={2}>Exchanges (if applicable)</Heading>
            <Text fontSize="14px" color="gray.700">
              We only replace items if they are defective or damaged. If you
              need to exchange it for the same item, send us an email at
              Cropxgenetic@gmail.com and send your item to:
            </Text>
            <VStack gap={0} alignItems="baseline" mt="1rem">
              <Text fontSize="14px" color="gray.700" fontWeight="600">Cropx Genetic Pvt Ltd</Text>
              <Text fontSize="14px" color="gray.700" fontWeight="600">
                S19, 2nd Floor, Agrasen Tower, Vidhyadhar Nagar, Jaipur,
                Rajasthan, IN 302039
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
      <Footer/>
    </>
  );
};

export default ReturnRefundPolicy;
