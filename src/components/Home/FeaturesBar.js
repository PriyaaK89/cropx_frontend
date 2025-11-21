import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { Tag, CheckCircle, Truck } from "lucide-react";

const FeaturesBar = () => {
  const bg = useColorModeValue("#dfe8e2", "green.900");
  const iconBg = useColorModeValue("orange.100", "orange.600");

  const features = [
    { icon: Tag, title: "100% Branded", subtitle: "Products" },
    { icon: CheckCircle, title: "100% Original", subtitle: "Products" },
    { icon: Truck, title: "Free", subtitle: "Delivery" },
  ];

  return (
    <Box bg={bg} py={8} px={6} mt='2rem'>
      <Flex
        justify="space-around"
        align="center"
        wrap="wrap"
        gap={8}
        maxW="1200px"
        mx="auto"
      >
        {features.map((f, i) => (
          <Flex
            key={i}
            align="center"
            gap={4}
            bg="white"
            px={6}
            py={4}
            borderRadius="2xl"
            boxShadow="sm"
            _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            <Flex
              bg={iconBg}
              p={3}
              borderRadius="full"
              align="center"
              justify="center"
            >
              <Icon as={f.icon} boxSize={6} color="orange.500" />
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="lg" color="green.700" fontFamily="Inter-SemiBold" lineHeight='24px'>
                {f.title}
              </Text>
              <Text fontWeight="medium" color="green.600">
                {f.subtitle}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default FeaturesBar;
