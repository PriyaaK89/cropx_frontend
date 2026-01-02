import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";

const Row = ({ label, value, bg }) => (
  <HStack
    px="16px"
    py="8px"
    bg={bg}
    align="start"
    spacing="24px"
  >
    <Box w={{base: "65px",md:"240px"}} fontWeight="600" color="#111827" fontSize="14px">
      {label}
    </Box>
    <Box flex="1" color="#374151" fontSize="14px">
      {value}
    </Box>
  </HStack>
);

const AdditionalDetails = ({ data }) => {
  const overview = data?.details?.product_overview || [];

  return (
    <Box mt="40px" bg="white" padding={{base:"2rem 1rem", md:"2rem 3rem"}}>
      <VStack align="stretch" spacing="32px">

        {/* ================= OVERVIEW ================= */}
        <Box>
          <Heading fontSize="20px" mb="16px">
            Overview
          </Heading>

          <Box overflow="hidden">
            {overview.map((item, i) => (
              <Row
                key={i} 
                label={`Feature ${i + 1}`}
                value={item.name} 
                bg={i % 2 === 0 ? "#FFFFFF" : "#f0f3f5ff"}
              />
            ))}
          </Box>
        </Box>

        {/* ================= KEY FEATURES ================= */}
        <Box>
          <Heading fontSize={{base: "18px",lg:"20px"}} mb={{base:"12px",md:"16px"}}>
            Key Features & Benefits
          </Heading>

          <VStack align="start" spacing="6px">
            {data?.details?.key_features_and_benefits?.map((item, i) => (
              <HStack key={i} align="start">
                <Text fontWeight="bold">•</Text>
                <Text color="#374151" fontSize={{base: "15px",md:"15px"}} lineHeight={{base: "20px", md: "22px"}}>{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* ================= EXPERT ADVICE ================= */}
        <Box>
          <Heading fontSize={{base: "18px",lg:"20px"}} mb={{base:"12px",md:"16px"}}>
            Expert Advice
          </Heading>

          <VStack align="start" spacing="6px">
            {data?.details?.expert_advice?.map((item, i) => (
              <HStack key={i} align="start">
                <Text fontWeight="bold">•</Text>
                <Text color="#374151" fontSize={{base: "15px",md:"15px"}} lineHeight={{base: "20px", md: "22px"}}>{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* ================= ADDITIONAL INFO ================= */}
        <Box>
          <Heading fontSize={{base: "18px",lg:"20px"}} mb={{base:"12px",md:"16px"}}>
            Additional Information
          </Heading>

          <VStack align="start" spacing="6px">
            {data?.details?.additional_information?.map((item, i) => (
              <HStack key={i} align="start">
                <Text fontWeight="bold">•</Text>
                <Text color="#374151" fontSize={{base: "15px",md:"15px"}} lineHeight={{base: "20px", md: "22px"}}>{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

      </VStack>
    </Box>
  );
};

export default AdditionalDetails;
