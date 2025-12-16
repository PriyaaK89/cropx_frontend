import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Input, VStack, Text, Spinner, Flex, Image,} from "@chakra-ui/react";
import { Config } from "../Utils/Config";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  //  Fetch suggestions
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Config?.search_products}?q=${query}`
        );
        setResults(res.data.data || []);
        setOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  //  Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Handle selection
  const handleSelect = (item) => {
    setQuery("");
    setOpen(false);
    navigate(`/product-details/${item.product_id}`);
  };

  return (
    <Box ref={wrapperRef} position="relative" w="300px">
      <Input
        placeholder="Search products, categories or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
      />

      {open && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          mt="2"
          zIndex="10"
          maxH="300px"
          overflowY="auto"
          boxShadow="md"
        >
          {loading && (
            <Box p="3" textAlign="center">
              <Spinner size="sm" />
            </Box>
          )}

          {!loading && results.length === 0 && (
            <Text p="3" fontSize="sm" color="gray.500">
              No results
            </Text>
          )}

          <VStack spacing="0" align="stretch">
            {results.map((item) => (
              <Box
                key={item.product_id}
                p="3"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleSelect(item)}
              >
                <Flex alignItems="center" gap="12px">
                  <Image src={item?.product_img} alt={item?.product_name} width="35px"/>
                <Text fontWeight="semibold">
                  {item?.product_name}
                </Text>
                </Flex>
                {/* <Text fontSize="xs" color="gray.500">
                  {item.cate_name} • ID #{item.product_id}
                </Text> */}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
