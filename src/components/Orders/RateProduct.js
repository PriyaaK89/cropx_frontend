import { Flex, Text } from "@chakra-ui/react";

const StarRating = ({ value, onChange }) => {
  return (
    <Flex gap={0.5}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          cursor="pointer"
          fontSize="18px"
          color={star <= value ? "yellow.400" : "gray.300"}
          onClick={() => onChange(star)}
        >
          ★
        </Text>
      ))}
    </Flex>
  );
};

export default StarRating