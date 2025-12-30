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
  Stack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TopNavbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <TopNavbar />
      <Box py={{ base: 8, md: 14 }}>
        <Box bg="white" p={{ base: 5, md: 14 }}>
          <VStack align="start" spacing={6}>
            {/* Page Title */}
            <Heading size="xl" color="black.400">
              Privacy Policy
            </Heading>

            <Text fontSize="sm" color="gray.500">
              Effective Date: {new Date().toLocaleDateString()}
            </Text>

            <Divider />

            {/* Intro */}
            <Text fontSize="15px" color="gray.700" lineHeight="1.8">
              At <strong>CropX Farmer</strong>, your privacy is extremely
              important to us. This Privacy Policy document outlines the types
              of information that are collected and recorded by CropX Farmer and
              how we use it. By accessing or using our platform, you agree to
              the terms of this Privacy Policy.
            </Text>

            {/* Section 1 */}
            <Heading size="md">1. Information We Collect</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              We collect information to provide better services to our users.
              The types of information we collect include:
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Personal details such as name, phone number, email address, and
                delivery address
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Account login information
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Order history and transaction details
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Device, browser, IP address, and usage data
              </ListItem>
            </List>

            {/* Section 2 */}
            <Heading size="md">2. How We Use Your Information</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              The information we collect is used for the following purposes:
            </Text>

            <List spacing={3} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To process and deliver your orders efficiently
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To improve our products, services, and user experience
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To communicate order updates, offers, and service information
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To maintain platform security and prevent fraudulent activities
              </ListItem>
            </List>

            {/* Section 3 */}
            <Heading size="md">3. Sharing of Information</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              We do not sell, trade, or rent your personal information to third
              parties. Your data may only be shared with:
            </Text>

            <List spacing={3} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Delivery partners for order fulfillment
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Payment service providers for secure transactions
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Legal authorities when required by law
              </ListItem>
            </List>

            {/* Section 4 */}
            <Heading size="md">4. Data Security</Heading>

            <Text fontSize="15px" lineHeight="1.8">
              We implement appropriate technical and organizational security
              measures to protect your personal data against unauthorized
              access, alteration, disclosure, or destruction. However, no
              internet-based system is completely secure.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              At <strong>CropX Farmer</strong>, data security is a critical
              priority. We follow industry-standard practices to ensure that
              your personal information is handled in a safe and responsible
              manner throughout its lifecycle — from collection and storage to
              processing and deletion.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              Our technical safeguards include secure servers, encrypted
              communication protocols (HTTPS/SSL), controlled access to
              databases, and continuous system monitoring to detect and prevent
              unauthorized activities, cyber threats, and data breaches.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              Access to personal data is strictly limited to authorized
              personnel who require such access for operational purposes. All
              employees and service providers are trained in data protection and
              confidentiality obligations and are bound by internal security
              policies.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              We regularly review and update our security practices to address
              emerging risks, perform system audits, and apply necessary
              security patches to protect against vulnerabilities such as
              malware, phishing, unauthorized access, and data misuse.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              Payment-related transactions are processed through secure, PCI-DSS
              compliant third-party payment gateways. We do not store sensitive
              financial information such as card numbers, CVV codes, or UPI PINs
              on our servers.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              While we take all reasonable steps to safeguard your data, you
              acknowledge that no method of electronic transmission or storage
              is entirely secure. Therefore, we cannot guarantee absolute
              protection against all possible security threats.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              We encourage users to take necessary precautions, such as
              maintaining strong passwords, safeguarding login credentials, and
              notifying us immediately of any suspected unauthorized access or
              security concerns.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              In the event of a data security incident, we will take prompt and
              appropriate action in accordance with applicable laws and
              regulations to minimize any potential impact.
            </Text>

            {/* Section 5 */}
            <Heading size="md">5. Cookies & Tracking Technologies</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              CropX Farmer uses cookies and similar tracking technologies to
              enhance your browsing experience, improve website functionality,
              and understand how users interact with our platform. Cookies help
              us remember your preferences, keep you logged in, and provide a
              more personalized and efficient user experience.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              We also use cookies to analyze website traffic, monitor
              performance, and identify areas for improvement so that we can
              continuously enhance our services and offerings. These insights
              help us deliver relevant content and features that better serve
              our users.
            </Text>

            <Text fontSize="15px" lineHeight="1.8">
              You have the option to accept or decline cookies through your
              browser settings. Please note that disabling cookies may affect
              certain features and functionality of the website and could limit
              your overall experience.
            </Text>

            {/* Section 6 */}
            <Heading size="md">6. Your Rights</Heading>
            <Text fontSize="15px" lineHeight="1.8">
              You have the right to:
            </Text>

            <List spacing={3} pl={4}>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Access and review your personal information
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Request correction or deletion of your data
              </ListItem>
              <ListItem fontSize="15px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Withdraw consent for data processing
              </ListItem>
            </List>

            {/* Section 7 */}
            <Heading size="md">7. Third-Party Links</Heading>
            <Text fontSize="15px" lineHeight="1.8">
               Our website may include links to third-party websites or services for your
  convenience and additional information. Please note that CropX Farmer does
  not control and is not responsible for the content, privacy policies, or
  practices of any external websites. We encourage users to review the privacy
  policies of third-party sites before sharing any personal information.
            </Text>

            {/* Section 8 */}
            <Heading size="md">8. Policy Updates</Heading>
            <Text fontSize="15px" lineHeight="1.8">
             CropX Farmer reserves the right to update or modify this Privacy Policy from
  time to time to reflect changes in our practices, services, legal
  requirements, or regulatory obligations. Any updates or revisions will be
  posted on this page with a revised effective date. We encourage users to
  review this Privacy Policy periodically to stay informed about how their
  information is being protected. Continued use of our website after any
  changes indicates acceptance of the updated policy.
            </Text>

            {/* Section 9 */}
            <Heading size="md">9. Contact Us</Heading>
            <Stack spacing={1}>
              <Text fontSize="15px">Email: cropxgenetic@gmail.com</Text>
              <Text fontSize="15px">Phone: +91-9414570920</Text>
            </Stack>
          </VStack>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
