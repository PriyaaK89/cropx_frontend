import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Box, Image, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../Utils/Config";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getBanners = async () => {
    try {
      const response = await axios.get(`${Config?.Get_Banner_url}`);
      if (response?.data?.banners) setBanners(response.data.banners);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (loading)
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box position="relative">
  <Box 
  ref={emblaRef} 
  overflow="hidden" 
  ml="calc(-50vw + 50%)" 
  h="366px"
>
  <Box display="flex" h="366px">
    {banners.map((item, index) => (
      <Box key={index} flex="0 0 100%" h="366px">
        <Image
          src={item.banner_img}
          w="100%"
          h="100%"
          objectFit="contain"
        />
      </Box>
    ))}
  </Box>
</Box>

      {/* dots */}
      <Box display="flex" justifyContent="center" gap={2} mt={2} position='absolute' bottom='10px' width='100%'>
        {banners.map((_, index) => (
          <Box
            key={index}
            w="10px"
            h="10px"
            borderRadius="full"
            bg={index === selectedIndex ? "teal.500" : "gray.400"}
            cursor="pointer"
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BannerSlider;
