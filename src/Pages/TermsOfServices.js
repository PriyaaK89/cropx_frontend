import {
  Box,
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
      <TopNavbar />
      <Box py={{ base: 8, md: 14 }}>
        <Box bg="white" p={{ base: 5, md: 14 }}>
          <VStack align="start" spacing={4} fontSize="14px">
            <Heading fontSize="32px" color="black.400">
              Terms of Service
            </Heading>

            <Text color="gray.500" fontSize="sm">
              Effective Date: {new Date().toLocaleDateString()}
            </Text>

            <Divider />

            <Text fontSize="14px">
              Welcome to <strong>Cropx Farmer</strong>. These Terms of Service
              govern your access to and use of our website, products, and
              services. By accessing or using our platform, you agree to comply
              with and be bound by these Terms. If you do not agree with any
              part of these Terms, please do not use our services.
            </Text>

            <Heading size="md">1. Use of the Platform</Heading>
            <Text fontSize="14px">
              We provides an online marketplace and related services for
              agricultural products. By accessing or using the platform, you
              agree to use it only for lawful purposes and in compliance with
              all applicable laws, regulations, and these Terms.
            </Text>

            <Text fontSize="14px">
              You agree to provide accurate, current, and complete information
              while creating an account or placing an order. Providing false or
              misleading information may result in suspension or termination of
              your account.
            </Text>

            <Text fontSize="14px">
              You are responsible for maintaining the confidentiality of your
              login credentials. All activities conducted through your account
              will be deemed to be your responsibility.
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Ensure all account details are accurate and up to date
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Keep your login credentials secure and confidential
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Do not engage in unauthorized, illegal, or harmful use of the
                platform
              </ListItem>
            </List>

            <Text fontSize="14px">
              We reserves the right to suspend or terminate access to the
              platform if any misuse or violation of these Terms is identified.
            </Text>

            <Heading size="md">
              2. Account Security and User Obligations
            </Heading>
            <Text fontSize="14px">
              By creating an account on Cropx Farmer, you acknowledge and agree
              that you are solely responsible for maintaining the accuracy,
              completeness, and security of your account information at all
              times. You accept full responsibility for all activities conducted
              through your account, whether such activities are performed by you
              or by any third party using your login credentials. You agree to
              safeguard your username, password, and any authentication details
              and to refrain from sharing them with any other person.
            </Text>
            <Text fontSize="14px">
              You must promptly notify Cropx Farmer of any actual or suspected
              unauthorized access, misuse, or security breach relating to your
              account. Cropx Farmer shall not be liable for any loss, damage, or
              unauthorized activity arising from your failure to protect your
              account credentials or to provide timely notice of a security
              incident. Cropx Farmer reserves the right, at its sole discretion,
              to suspend or terminate your account if it reasonably believes
              that your account has been compromised or used in violation of
              these Terms.
            </Text>

            <Heading size="md">3. Orders & Payments</Heading>
            <Text fontSize="14px">
              All orders placed on our platform are subject to acceptance by us
              and the availability of the requested products. We reserves the
              right to refuse, cancel, or limit any order at its sole
              discretion, including in cases of product unavailability, pricing
              errors, suspected fraudulent activity, or violation of these
              Terms. Product prices, descriptions, specifications, and
              availability are subject to change at any time without prior
              notice.
            </Text>

            <Text fontSize="14px">
              By placing an order, you authorize us to process the payment for
              the total order amount, including applicable taxes, shipping
              charges, and other fees. Payments are processed through secure and
              authorized third-party payment gateways. We does not collect,
              store, or retain sensitive payment information such as credit or
              debit card numbers, CVV details, expiry dates, or UPI PINs.
            </Text>

            <Text fontSize="14px">
              We shall not be responsible or liable for any payment-related
              issues, including transaction failures, delays, or unauthorized
              deductions, arising from technical issues or errors attributable
              to third-party payment service providers, banks, or financial
              institutions. Any disputes related to payment processing must be
              resolved directly with the respective payment provider, subject to
              applicable laws.
            </Text>

            {/* Section 5 */}
            <Heading size="md">4. Shipping & Delivery</Heading>

            <Text fontSize="14px">
              We makes reasonable efforts to dispatch and deliver products
              within the estimated delivery timelines communicated at the time
              of order placement. All delivery timelines provided are indicative
              and may vary based on factors such as product availability,
              delivery location, and operational constraints.
            </Text>

            <Text fontSize="14px">
              We Farmer shall not be held responsible or liable for any delay or
              failure in delivery caused by circumstances beyond its reasonable
              control, including but not limited to delays by logistics
              partners, natural disasters, weather conditions, government
              restrictions, force majeure events, or other unforeseen
              circumstances. In such cases, delivery timelines may be extended
              without incurring any liability.
            </Text>

            {/* Section 6 */}
            <Heading size="md">6. Intellectual Property</Heading>
            <Text fontSize="14px">
              All content available on this platform, including but not limited
              to logos, trademarks, text, graphics, images, audio, video,
              software, and other digital materials, is owned by or licensed to
              the platform operator and is protected under applicable
              intellectual property laws. Such content is provided solely for
              personal and non-commercial use in connection with the services
              offered on the platform.
            </Text>
            <Text fontSize="14px">
              Any unauthorized copying, reproduction, modification,
              distribution, transmission, display, or use of the platform
              content, in whole or in part, without prior written permission, is
              strictly prohibited and may result in legal action. Nothing
              contained on this platform shall be construed as granting, by
              implication or otherwise, any license or right to use any
              intellectual property displayed herein without express
              authorization.
            </Text>

            {/* Section 7 */}
            <Heading size="md">7. Prohibited Activities</Heading>
            <Text fontSize="14px">
              You agree not to engage in activities that may:
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Harm or disrupt the platform or its users
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Involve fraudulent, misleading, or deceptive practices
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Attempt to gain unauthorized access to systems or data
              </ListItem>
            </List>

            {/* Section 8 */}
            <Heading size="md">8. Limitation of Liability</Heading>
            <Text fontSize="14px">
              To the maximum extent permitted under applicable law, the
              platform, its owners, affiliates, directors, officers, employees,
              and service providers shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising
              out of or in connection with your access to, use of, or inability
              to use the platform or its services. This includes, without
              limitation, damages for loss of profits, revenue, data, business
              opportunities, goodwill, or anticipated savings, even if such
              damages were foreseeable or advised.
            </Text>

            <Text fontSize="14px">
              The platform is provided on an “as is” and “as available” basis
              without any warranties or guarantees of uninterrupted access,
              accuracy, reliability, or suitability for a particular purpose. No
              representation or warranty is made that the platform will be
              error-free, secure, or free from viruses or other harmful
              components. Your use of the platform and reliance on any content
              or services is at your sole risk.
            </Text>

            <Text fontSize="14px">
              In no event shall the total aggregate liability of the platform or
              its associated parties, whether arising in contract, tort,
              negligence, or otherwise, exceed the amount paid by you, if any,
              for the specific service or transaction giving rise to the claim.
              Nothing in these Terms shall exclude or limit liability to the
              extent that such exclusion or limitation is prohibited under
              applicable law.
            </Text>

            {/* Section 10 */}
            <Heading size="md">10. Changes to These Terms</Heading>
            <Text fontSize="14px">
              The platform reserves the right to modify, amend, or update these
              Terms of Service at any time, at its sole discretion. Any
              revisions will be made effective upon being posted on this page,
              along with the updated effective date.
            </Text>

            <Text fontSize="14px">
              It is your responsibility to review these Terms periodically to
              stay informed of any changes. Your continued access to or use of
              the platform after the revised Terms have been published shall
              constitute your acceptance of and agreement to be bound by the
              updated Terms.
            </Text>

            {/* Section 11 */}
            <Heading size="md">11. Governing Law</Heading>
            <Text fontSize="14px">
              These Terms of Service, and any dispute or claim arising out of or
              in connection with them, shall be governed by and construed in
              accordance with the laws of India, without regard to its conflict
              of law principles.
            </Text>

            <Text fontSize="14px">
              Subject to applicable law, all disputes, claims, or legal
              proceedings arising from or relating to the use of the platform or
              these Terms shall be subject to the exclusive jurisdiction of the
              competent courts located within India.
            </Text>

            {/* Section 12 */}
            <Heading size="md">12. Contact Us</Heading>
            <Text fontSize="14px">
              If you have any questions, concerns, or feedback regarding these
              Terms of Service, our policies, or the use of the platform, we are
              here to help. Please feel free to reach out to us through any of
              the following channels:
              <br />
               Email: cropxgenetic@gmail.com
              <br />
               Phone: +91-9414570920
            </Text>
          </VStack>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default TermsOfService;
