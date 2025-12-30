import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const TermsOfService = () => {
  return (
    <>
    <TopNavbar/>
    <Box  py={{ base: 8, md: 14 }}>
     
        <Box
          bg="white"
          p={{ base: 5, md: 14 }}

        >
          <VStack align="start" spacing={6} fontSize="15px">
            {/* Title */}
            <Heading size="xl" color="black.400">
              Terms of Service
            </Heading>

            <Text color="gray.500" fontSize="sm">
              Effective Date: {new Date().toLocaleDateString()}
            </Text>

            <Divider />

            {/* Intro */}
            <Text fontSize="15px" lineHeight="1.8">
              Welcome to <strong>CropX Farmer</strong>. These Terms of Service
              govern your access to and use of our website, products, and
              services. By accessing or using our platform, you agree to comply
              with and be bound by these Terms. If you do not agree with any part
              of these Terms, please do not use our services.
            </Text>

            {/* Section 1 */}
            <Heading size="md">1. Use of the Platform</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              CropX Farmer provides an online platform for agricultural products
              and related services. You agree to use the platform only for lawful
              purposes and in a manner that does not violate any applicable
              laws, regulations, or the rights of others.
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You must provide accurate and complete information when creating
                an account
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You are responsible for maintaining the confidentiality of your
                login credentials
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Unauthorized use of the platform is strictly prohibited
              </ListItem>
            </List>

            {/* Section 2 */}
            <Heading size="md">2. Account Responsibility</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              When you create an account with CropX Farmer, you are responsible
              for all activities that occur under your account. You agree to
              notify us immediately of any unauthorized use or security breach.
            </Text>

            {/* Section 3 */}
            <Heading size="md">3. Orders & Payments</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              All orders placed through our platform are subject to acceptance
              and availability. Prices, product descriptions, and availability
              are subject to change without notice.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              Payments are processed through secure third-party payment gateways.
              CropX Farmer does not store sensitive payment details such as card
              numbers, CVV, or UPI PINs.
            </Text>

            {/* Section 4 */}
            <Heading size="md">4. Shipping & Delivery</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              We aim to deliver products within the estimated timelines;
              however, delivery times may vary due to factors beyond our
              control. CropX Farmer shall not be held liable for delays caused by
              logistics partners, natural conditions, or unforeseen
              circumstances.
            </Text>

            {/* Section 5 */}
            <Heading size="md">5. Returns & Refunds</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              Returns and refunds are subject to our Return Policy. Products may
              be eligible for return or replacement only if they meet the
              specified conditions mentioned on the product page or policy
              section.
            </Text>

            {/* Section 6 */}
            <Heading size="md">6. Intellectual Property</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              All content on this platform, including logos, text, graphics,
              images, and software, is the property of CropX Farmer or its
              licensors and is protected by applicable intellectual property
              laws. Unauthorized reproduction or distribution is prohibited.
            </Text>

            {/* Section 7 */}
            <Heading size="md">7. Prohibited Activities</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              You agree not to engage in activities that may:
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Harm or disrupt the platform or its users
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Involve fraudulent, misleading, or deceptive practices
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Attempt to gain unauthorized access to systems or data
              </ListItem>
            </List>

            {/* Section 8 */}
            <Heading size="md">8. Limitation of Liability</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              CropX Farmer shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of or
              inability to use the platform, including loss of data, profits,
              or business opportunities.
            </Text>

            {/* Section 9 */}
            <Heading size="md">9. Termination</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              We reserve the right to suspend or terminate your access to the
              platform at any time, without prior notice, if you violate these
              Terms or engage in unlawful activities.
            </Text>

            {/* Section 10 */}
            <Heading size="md">10. Changes to These Terms</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              CropX Farmer may update these Terms of Service from time to time.
              Any changes will be posted on this page with an updated effective
              date. Continued use of the platform after changes constitutes
              acceptance of the revised Terms.
            </Text>

            {/* Section 11 */}
            <Heading size="md">11. Governing Law</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              These Terms shall be governed and interpreted in accordance with
              the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of Indian courts.
            </Text>

            {/* Section 12 */}
            <Heading size="md">12. Contact Us</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              If you have any questions regarding these Terms of Service, please
              contact us:
              <br />
              📧 Email: support@cropxfarmer.com
              <br />
              📞 Phone: +91-XXXXXXXXXX
            </Text>
          </VStack>
        </Box>
     
    </Box>
    <Footer/>
    </>
  );
}

export default TermsOfService