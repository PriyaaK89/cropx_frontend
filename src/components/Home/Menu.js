import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, SimpleGrid, Stack, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, IconButton, useDisclosure, Collapse } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { Config } from "../Utils/Config";

const HOVER_DELAY = 150;

const MenuBar = () => {
  const [menuItem, setMenuItem] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const hoverTimeout = useRef(null);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* ---------------- FETCH MENU ---------------- */
  const fetchMenu = async () => {
    try {
      const response = await axios.get(Config?.get_menu);
      if (response?.status === 200) {
        setMenuItem(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  /* ---------------- HOVER HANDLERS (NO FLICKER) ---------------- */
  const openMenu = (slug) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveMenu(slug);
    }, HOVER_DELAY);
  };

  const closeMenu = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, HOVER_DELAY);
  };

  /* ---------------- NAVIGATION ---------------- */
  const handleNavigate = (path) => {
    setActiveMenu(null);
    onClose();
    navigate(path);
  };

  return (
    <Box position="relative">
      {/* ================= DESKTOP NAV ================= */}
      <Flex
        display={{ base: "none", md: "flex" }} justify="center" gap={10} px={8} py={3}
        borderBottom="1px solid #e5e5e5" bg="white" zIndex={10} >
        {menuItem.map((category) => (
          <Link to={`/products/category/${category.slug}`}>
          <Box
            key={category.slug}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            onMouseEnter={() => openMenu(category.slug)}
            onMouseLeave={closeMenu}
            onFocus={() => setActiveMenu(category.slug)}
            onBlur={() => setActiveMenu(null)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {handleNavigate(`/category/${category.slug}`);}
            //   if (e.key === "Escape") setActiveMenu(null);}}
          >
            <Text cursor="pointer" fontSize="15px" fontWeight="500"
              textTransform="capitalize" _hover={{ color: "green.500" }}>
              {category.name}
            </Text>
          </Box>
          </Link>
        ))}
      </Flex>

      {/* ================= MEGA MENU (ANIMATED) ================= */}
      {menuItem.map(
        (category) =>
          activeMenu === category.slug &&
          category.sub_categories?.length > 0 && (
            <Collapse in={activeMenu === category.slug} animateOpacity key={category.slug} >
              <Box
                position="absolute" backgroundColor="#fbfbfb" top="100%" left="0" width="100%" boxShadow="lg" zIndex={9} onMouseEnter={() => openMenu(category.slug)}
                onMouseLeave={closeMenu} >
                <Box maxW="1200px" mx="auto" p={6}>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                    {category.sub_categories.map((sub) => (
                      <Link to={`/products/sub-category/${sub.slug}`}>
                      <Box key={sub.slug}>
                        <Text fontWeight="600" mb={2} color="green.600" textTransform="uppercase" fontSize="sm">
                          {sub.name}
                        </Text>

                        <Stack spacing={2}>
                          {sub.children?.length > 0 ? (
                            sub.children.map((child) => (
                              <Link to={`/products/child-category/${child?.slug}`}>
                              <Text
                                key={child.slug}
                                fontSize="sm" pb="5px"
                                cursor="pointer" borderBottom="1px solid #e8e8e8" width="240px"
                                tabIndex={0} textTransform="uppercase"
                                _hover={{ color: "green.500" }}
                                // onClick={() => handleNavigate( `/category/${category.slug}/${child.slug}`)}
                                // onKeyDown={(e) => { if (e.key === "Enter") { handleNavigate( `/category/${category.slug}/${child.slug}` ); }}}
                              >
                                {child.name}
                              </Text></Link>
                            ))
                          ) : (
                            <Text
                              fontSize="sm"
                              cursor="pointer"
                              onClick={() =>
                                handleNavigate(`/category/${category.slug}`)
                              }
                            >
                              View All
                            </Text>
                          )}
                        </Stack>
                      </Box>
                      </Link>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Collapse>
          )
      )}

      {/* ================= MOBILE MENU ================= */}
      <Flex display={{ base: "flex", md: "none" }} justify="space-between" px={4} py={2} borderBottom="1px solid #e5e5e5">
        <IconButton icon={<HamburgerIcon />} aria-label="Open menu" onClick={onOpen} />
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Categories</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {menuItem.map((category) => (
                <Box key={category.slug}>
                  <Text fontWeight="600" cursor="pointer"
                    onClick={() => handleNavigate(`/category/${category.slug}`)}>
                    {category.name}
                  </Text>

                  <Stack pl={4} mt={2}>
                    {category.sub_categories?.map((sub) => (
                      <Text key={sub.slug} fontSize="sm" cursor="pointer"
                        onClick={() => handleNavigate( `/category/${category.slug}/${sub.slug}` )}>
                        {sub.name}
                      </Text>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuBar;
