import { Box, Text, VStack, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select, Checkbox, Divider, Icon, Flex,} from "@chakra-ui/react";
import { StarIcon, ChevronUpIcon } from "@chakra-ui/icons";

const STEP = 500;
const MAX_PRICE = 80000;
const MAX_MIN_PRICE = 10000;

const minPriceOptions = Array.from(
  { length: MAX_MIN_PRICE / STEP + 1 },
  (_, i) => i * STEP
);

const maxPriceOptions = Array.from(
  { length: MAX_PRICE / STEP },
  (_, i) => (i + 1) * STEP
);

const ProductFilters = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  rating,
  setRating,
  stock,
  setStock,
}) => {


  const handleMinPriceChange = (value) => {
    const newMin = Number(value);

    setMinPrice(newMin);

    if (newMin > maxPrice) {
      setMaxPrice(newMin);
    }
  };

  const handleMaxPriceChange = (value) => {
    const newMax = Number(value);

    setMaxPrice(newMax);

    if (newMax < minPrice) {
      setMinPrice(0);
    }
  };

  const handleRatingChange = (value) => {
    setRating((prev) => (prev === value ? null : value));
  };

  const handleStockChange = (value) => {
    setStock((prev) => (prev === value ? null : value));
  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      w="100%">
      <VStack align="stretch" spacing={5}>
        <Box>
          <Text fontWeight="600" mb={3}>
            PRICE
          </Text>

          <Slider
            min={0}
            max={MAX_PRICE}
            step={STEP}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            mb={4}>
            <SliderTrack bg="gray.200">
              <SliderFilledTrack bg="green.500" />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <HStack spacing={3}>
            <Select
              size="sm"
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}>
              {minPriceOptions.map((price) => (
                <option key={price} value={price}>
                  ₹{price}
                </option>
              ))}
            </Select>

            <Text fontSize="sm">To</Text>

            <Select
              size="sm"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}>
              {maxPriceOptions.map((price) => (
                <option key={price} value={price}>
                  ₹{price}
                </option>
              ))}
            </Select>
          </HStack>

          <Text mt={2} fontSize="sm" color="gray.600">
            Price range: <strong>₹{minPrice}</strong> –{" "}
            <strong>₹{maxPrice}</strong>
          </Text>
        </Box>

        <Divider />

        <Box>
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontWeight="600">RATING</Text>
            <Icon as={ChevronUpIcon} />
          </Flex>

          <VStack align="start" spacing={2}>
            {[4, 3, 2].map((r) => (
              <Checkbox
                key={r}
                isChecked={rating === r}
                onChange={() => handleRatingChange(r)}>
                <HStack spacing={1}>
                  <Text>{r}</Text>
                  <StarIcon color="yellow.400" />
                  <Text color="gray.600">And Above</Text>
                </HStack>
              </Checkbox>
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Flex justify="space-between" align="center" mb={3}>
            <Text fontWeight="600">AVAILABILITY</Text>
            <Icon as={ChevronUpIcon} />
          </Flex>

          <VStack align="start" spacing={2}>
            <Checkbox
              isChecked={stock === "in"}
              onChange={() => handleStockChange("in")}>
              In Stock
            </Checkbox>

            <Checkbox
              isChecked={stock === "out"}
              onChange={() => handleStockChange("out")}>
              Out Of Stock
            </Checkbox>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProductFilters;
