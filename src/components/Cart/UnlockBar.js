import { AnimatePresence, motion } from "framer-motion";
import { burstVariants, unlockVariants } from "../Utils/animation";
import { Box, HStack, Text } from "@chakra-ui/react";

const UnlockBar = ({showUnlockedBar}) => {
  const MotionBox = motion(Box);

  return (
    <>
      <AnimatePresence>
        {showUnlockedBar && (
          <MotionBox
            bg="#f4f0ff"
            borderRadius="6px"
            p={3}
            mb={3}
            variants={unlockVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <HStack spacing={3}>
              {/* 🎉 Bomb animation */}
              <MotionBox
                variants={burstVariants}
                initial="hidden"
                animate="visible">
                <Text fontSize="20px">🎉</Text>
              </MotionBox>

              <Text fontSize="14px" fontWeight="600" color="#6b46c1">
                Yay! You have unlocked Free Delivery
              </Text>
            </HStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnlockBar;
