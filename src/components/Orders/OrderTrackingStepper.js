import { Box, Flex, Text, Icon, Circle } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaClipboardList, FaBox, FaTruck, FaHome } from "react-icons/fa";

const TrackingStepper = ({ order_Status }) => {
  const steps = [
    { label: "Order Placed", icon: FaClipboardList },
    { label: "Dispatched", icon: FaBox },
    { label: "Shipped", icon: FaTruck },
    { label: "Delivered", icon: FaHome },
  ];

  const statusIndexMap = {
    PLACED: 0,
    DISPATCHED: 1,
    SHIPPED: 2,
    DELIVERED: 3,
  };

  const currentStep = statusIndexMap[order_Status] ?? 0;
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <Box w="100%" p={6} bg="white" borderRadius="lg" border="1px solid #e6e6e6">
      <Box position="relative">
        {/* BASE LINE */}
        <Box
          position="absolute"
          top="22px"
          left="22px"
          right="22px"
          h="4px"
          bg="gray.200"
          borderRadius="full"
        />

        {/* ACTIVE LINE */}
        <Box
          position="absolute"
          top="22px"
          left="22px"
          h="4px"
          bg="blue.500"
          borderRadius="full"
          width={`calc(${progressPercent}% - 22px)`}
          transition="width 0.4s ease"
        />

        {/* STEPS */}
        <Flex justify="space-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <Flex
                key={index}
                direction="column"
                align="center"
                zIndex={1}>
                <Circle
                  size="44px"
                  bg={isCompleted || isActive ? "blue.500" : "white"}
                  border="2px solid"
                  borderColor={isCompleted || isActive ? "blue.500" : "gray.300"}
                  boxShadow={isActive ? "0 0 0 6px rgba(66,153,225,0.2)" : "sm"}
                  transition="all 0.3s">
                  {isCompleted ? (
                    <CheckIcon color="white" />
                  ) : (
                    <Icon
                      as={step.icon}
                      color={isActive ? "white" : "gray.400"}
                      boxSize={5}
                    />
                  )}
                </Circle>

                <Text
                  mt={3}
                  fontSize="sm"
                  fontWeight={isActive ? "600" : "500"}
                  color={isCompleted || isActive ? "gray.800" : "gray.400"}>
                  {step.label}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default TrackingStepper;
