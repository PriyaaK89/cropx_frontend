import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Config } from "../Utils/Config";

const MenuBar = () => {
  const [menuItem, setMenuItem] = useState([]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(Config?.get_menu);
      if (response?.status === 200) {
        setMenuItem(response?.data?.data);
      }
    } catch (error) {
      console.log(error, "Error in fetching API response!");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Flex gap={10} px={8} py={3} borderBottom="1px solid #e5e5e5" justifyContent="center" boxShadow="1px 2px 6px #b1b1b1">
      {menuItem.map((category) => (
        <Popover
          key={category.slug}
          trigger="hover"
          placement="bottom-start" 
        >
          <PopoverTrigger>
            <Text
              cursor="pointer" fontSize="15px"
              fontWeight="500" textTransform="capitalize"
              _hover={{ color: "green.500" }}
            >
              {category.name}
            </Text>
          </PopoverTrigger>

          {category.sub_categories.length > 0 && (
            <PopoverContent
              p={6}
              width="100%"
              border="none"
              boxShadow="xl"
            >
              <SimpleGrid columns={4} spacing={6}>
                {category.sub_categories.map((sub) => (
                  <Box key={sub.slug} width="100%">
                    {/* Sub Category Heading */}
                    <Text
                      fontWeight="600"
                      mb={2}
                      color="green.600"
                      textTransform="uppercase"
                    >
                      {sub.name}
                    </Text>

                    {/* Children */}
                    <Stack spacing={1}>
                      {sub.children.length > 0 ? (
                        sub.children.map((child) => (
                          <Text
                            key={child.slug}
                            fontSize="sm"
                            cursor="pointer"
                            _hover={{ color: "green.500" }}
                          >
                            {child.name}
                          </Text>
                        ))
                      ) : (
                        <Text
                          fontSize="sm"
                          cursor="pointer"
                          _hover={{ color: "green.500" }}
                        >
                          View All
                        </Text>
                      )}
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            </PopoverContent>
          )}
        </Popover>
      ))}
    </Flex>
  );
};

export default MenuBar;
