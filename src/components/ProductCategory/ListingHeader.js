import { Box, Flex, Heading, Text, Select } from "@chakra-ui/react";

const ListingHeader = ({ title, totalItems, sort, onSortChange }) => {
  return (
    <Box bg="white" px={4} py={2} borderRadius="md" boxShadow="sm" >
      <Flex align="center" justify="space-between" flexWrap="wrap" gap={3}>
        <Flex align="baseline" gap={2}>
          <Heading size="26px" fontWeight="600" textTransform="capitalize" color="#4d4d4d">
            {title}
          </Heading>
          <Text fontSize="md" color="gray.500">
            ({totalItems})
          </Text>
        </Flex>

        <Select
          maxW="220px"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Latest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="best_selling">Best Selling</option>
        </Select>
      </Flex>
    </Box>
  );
};


export default ListingHeader;
