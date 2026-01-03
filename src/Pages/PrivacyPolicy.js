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
            <Heading fontSize="32px" color="black.400">
              Privacy Policy
            </Heading>

            <Text fontSize="sm" color="gray.500">
              Effective Date: {new Date().toLocaleDateString()}
            </Text>

            <Divider />

            {/* Intro */}
            <Text fontSize="14px" color="gray.700">
              We respect the trust you place in us and are committed to
              maintaining the highest standards of security to protect your
              transactions and personal information. Please review the details
              below to understand how we collect and use your information.
            </Text>

            <Box>
              <Text fontSize="16px" fontWeight="600" mb={4}>
                Note :
              </Text>
              <Text fontSize="14px" color="gray.700" mb={2}>
                Our privacy policy is subject to change at any time without
                notice. To make sure you are aware of any changes, please review
                this policy periodically.{" "}
              </Text>
              <Text fontSize="14px" color="gray.700" mb={2}>
                {" "}
                By visiting this Website you agree to be bound by the terms and
                conditions of this Privacy Policy.{" "}
              </Text>
              <Text fontSize="14px" color="gray.700" mb={2}>
                {" "}
                If you do not agree please do not use or access our Website.By
                mere use of the Website, you expressly consent to our use and
                disclosure of your personal information in accordance with this
                Privacy Policy. This Privacy Policy is incorporated into and
                subject to the Terms of Use.{" "}
              </Text>
            </Box>

            {/* Section 1 */}
            <Heading size="md">
              1. Collection of Personal and Other Information
            </Heading>
            <Text fontSize="14px">
              When you use the Cropx website, we may collect personal
              information that you voluntarily share with us from time to time.
              This information helps us provide a secure, smooth, and
              personalized experience. Our aim is to offer services and features
              that best match your needs and improve website usability, safety,
              and performance.
            </Text>

            <List spacing={2} pl={4}>
              <ListItem fontSize="14px">
                You can browse most parts of our website without sharing
                personal details. However, once you choose to provide personal
                information, such as while creating an account or placing an
                order, you will no longer remain anonymous to us. Wherever
                possible, we clearly indicate which information is mandatory and
                which is optional. You always have the choice not to provide
                certain information by choosing not to use specific services or
                features.
              </ListItem>
              <ListItem fontSize="14px">
                We may automatically collect certain non-personal information
                when you interact with our website. This includes details such
                as your browser type, IP address, pages visited, referring URLs,
                and navigation patterns. This data is collected in an aggregated
                form and is used only for internal analysis to better understand
                user behavior, improve our services, and enhance website
                security.
              </ListItem>
              <ListItem fontSize="14px">
                Cropx uses cookies and similar technologies on some pages to
                analyze website traffic, improve user experience, measure the
                effectiveness of promotions, and ensure platform security.
                Cookies are small data files stored on your device that help us
                recognize your preferences and reduce the need to re-enter
                information during a session. Most cookies are temporary and are
                automatically deleted once your session ends. You can choose to
                disable cookies through your browser settings; however, doing so
                may limit access to certain website features.
              </ListItem>
              <ListItem fontSize="14px">
                Some pages on our website may include cookies or tracking tools
                placed by third-party service providers. Cropx does not control
                or manage these third-party cookies.
              </ListItem>
              <ListItem fontSize="14px">
                If you make a purchase on Cropx, we collect information related
                to your order and purchase activity. When you complete a
                transaction, we may also collect necessary payment-related
                details such as billing address and payment method information.
                Payment data is processed securely through authorized payment
                gateways.
              </ListItem>
              <ListItem fontSize="14px">
                We collect personally identifiable information such as your
                name, email address, phone number, and payment details when you
                create an account or place an order on Cropx. While some
                sections of the website are accessible without registration,
                certain features and services require account creation. We may
                use your contact details to share order updates, service-related
                information, and relevant offers based on your preferences and
                past interactions.
              </ListItem>
            </List>

            {/* Section 2 */}
            <Heading size="md">2. How We Use Your Information</Heading>
            <Text fontSize="14px">
              The information we collect is used for the following purposes:
            </Text>

            <List spacing={3} pl={4}>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To process and deliver your orders efficiently
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To improve our products, services, and user experience
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To communicate order updates, offers, and service information
              </ListItem>
              <ListItem fontSize="14px">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                To maintain platform security and prevent fraudulent activities
              </ListItem>
            </List>

            {/* Section 3 */}
            <Heading size="md">3. Sharing of Personal Information</Heading>
            <Text fontSize="14px">
              Cropx may share your personal information with its group
              companies, affiliates, or trusted partners to help prevent fraud,
              identity theft, misuse of services, and other unlawful activities.
              Such sharing may also be necessary to manage linked or multiple
              accounts and to provide joint or co-branded services requested by
              you. These entities are not permitted to use your information for
              marketing purposes unless you have given your clear consent.
            </Text>

            <Text fontSize="14px">
              We may disclose personal information when required by law or when
              we believe in good faith that such disclosure is necessary to
              comply with legal obligations, including court orders, subpoenas,
              or other legal processes. We may also share information with law
              enforcement authorities, rights holders, or other relevant parties
              when necessary to enforce our Terms of Use or Privacy Policy,
              respond to legal claims, or protect the rights, safety, and
              property of our users or the public.
            </Text>
            <Text fontSize="14px">
              In the event that Cropx or its assets are involved in a merger,
              acquisition, business restructuring, reorganization, or sale to
              another business entity, your personal information may be shared
              or transferred as part of that process. Any such entity will be
              required to follow this Privacy Policy with respect to your
              personal data.
            </Text>

            {/* Section 4 */}
            <Heading size="md">4. Data Security</Heading>

            <Text fontSize="14px">
              We implement appropriate technical and organizational security
              measures to protect your personal data against unauthorized
              access, alteration, disclosure, or destruction. However, no
              internet-based system is completely secure.
            </Text>

            <Text fontSize="14px">
              At <strong>Cropx Farmer</strong>, data security is a critical
              priority. We follow industry-standard practices to ensure that
              your personal information is handled in a safe and responsible
              manner throughout its lifecycle — from collection and storage to
              processing and deletion.
            </Text>

            <Text fontSize="14px">
              Our technical safeguards include secure servers, encrypted
              communication protocols (HTTPS/SSL), controlled access to
              databases, and continuous system monitoring to detect and prevent
              unauthorized activities, cyber threats, and data breaches.
            </Text>

            <Text fontSize="14px">
              Access to personal data is strictly limited to authorized
              personnel who require such access for operational purposes. All
              employees and service providers are trained in data protection and
              confidentiality obligations and are bound by internal security
              policies.
            </Text>

            <Text fontSize="14px">
              We regularly review and update our security practices to address
              emerging risks, perform system audits, and apply necessary
              security patches to protect against vulnerabilities such as
              malware, phishing, unauthorized access, and data misuse.
            </Text>

            <Text fontSize="14px">
              Payment-related transactions are processed through secure, PCI-DSS
              compliant third-party payment gateways. We do not store sensitive
              financial information such as card numbers, CVV codes, or UPI PINs
              on our servers.
            </Text>

            <Text fontSize="14px">
              While we take all reasonable steps to safeguard your data, you
              acknowledge that no method of electronic transmission or storage
              is entirely secure. Therefore, we cannot guarantee absolute
              protection against all possible security threats.
            </Text>

            <Text fontSize="14px">
              We encourage users to take necessary precautions, such as
              maintaining strong passwords, safeguarding login credentials, and
              notifying us immediately of any suspected unauthorized access or
              security concerns.
            </Text>

            <Text fontSize="14px">
              In the event of a data security incident, we will take prompt and
              appropriate action in accordance with applicable laws and
              regulations to minimize any potential impact.
            </Text>

            {/* Section 5 */}
            <Heading size="md">5. Cookies & Tracking Technologies</Heading>
            <Text fontSize="14px">
              Cropx Farmer uses cookies and similar tracking technologies to
              enhance your browsing experience, improve website functionality,
              and understand how users interact with our platform. Cookies help
              us remember your preferences, keep you logged in, and provide a
              more personalized and efficient user experience.
            </Text>

            <Text fontSize="14px">
              We also use cookies to analyze website traffic, monitor
              performance, and identify areas for improvement so that we can
              continuously enhance our services and offerings. These insights
              help us deliver relevant content and features that better serve
              our users.
            </Text>

            <Text fontSize="14px">
              You have the option to accept or decline cookies through your
              browser settings. Please note that disabling cookies may affect
              certain features and functionality of the website and could limit
              your overall experience.
            </Text>

            <Heading size="md">6. Your Rights</Heading>
            <Text fontSize="14px">
              As a user of the Cropx website, you have certain rights regarding
              the personal information we collect and process. Cropx is
              committed to maintaining transparency and giving you control over
              your personal data, in accordance with applicable laws.
            </Text>

            <Text fontSize="14px">
              You have the right to access and review the personal information
              we hold about you. This allows you to understand what data is
              collected, how it is used, and for what purpose. You may request a
              copy of your personal information maintained by us.
            </Text>

            <Text fontSize="14px">
              You may request correction or updating of any personal information
              that is inaccurate, incomplete, or outdated to ensure accuracy and
              smooth service delivery.
            </Text>

            <Text fontSize="14px">
              In certain situations, you may request deletion of your personal
              data. Please note that some information may be retained to comply
              with legal requirements, resolve disputes, or prevent fraud.
            </Text>

            <Text fontSize="14px">
              Where processing is based on your consent, you have the right to
              withdraw that consent at any time. Withdrawal of consent may limit
              access to certain features or services.
            </Text>

            <Text fontSize="14px">
              You may also request restriction or limitation on how your
              personal information is processed in specific circumstances.
            </Text>

            <Text fontSize="14px">
              You have the right to opt out of receiving marketing and
              promotional communications from Cropx at any time. However,
              essential service-related communications may still be sent.
            </Text>

            <Text fontSize="14px">
              To exercise any of these rights, please contact us using the
              details provided in this Privacy Policy. We will respond within a
              reasonable time as required by applicable laws.
            </Text>

            {/* Section 7 */}
            <Heading size="md">7. Third-Party Links</Heading>
            <Text fontSize="14px">
              Our website may include links to third-party websites or services
              for your convenience and additional information. Please note that
              Cropx Farmer does not control and is not responsible for the
              content, privacy policies, or practices of any external websites.
              We encourage users to review the privacy policies of third-party
              sites before sharing any personal information.
            </Text>

            {/* Section 8 */}
            <Heading size="md">8. Policy Updates</Heading>
            <Text fontSize="14px">
              Cropx Farmer reserves the right to update or modify this Privacy
              Policy from time to time to reflect changes in our practices,
              services, legal requirements, or regulatory obligations. Any
              updates or revisions will be posted on this page with a revised
              effective date. We encourage users to review this Privacy Policy
              periodically to stay informed about how their information is being
              protected. Continued use of our website after any changes
              indicates acceptance of the updated policy.
            </Text>

            {/* Section 9 */}
            <Heading size="md">9. Contact Us</Heading>
            <Stack spacing={1}>
              <Text mb={2} fontSize="14px">
                Please Contact us regarding any questions regarding this
                statement on the below address.
              </Text>
              <Text fontSize="14px">
                Corporate Office: S-19, Agrasen Tower, Vidhyadhar Nagar, Jaipur,
                Rajasthan, 302039
              </Text>
              <Text fontSize="14px">Email: cropxgenetic@gmail.com</Text>
              <Text fontSize="14px">Phone: +91-9414570920</Text>
            </Stack>
          </VStack>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
