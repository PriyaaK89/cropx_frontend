import { Box} from "@chakra-ui/react";
import WebNavbar from "../Navbar/WebNavbar";
import ResponsiveNavbar from "../Navbar/ResponsiveNavbar";

export default function TopNavbar() {

  return (
    <>
      <Box width="100%" display={{base: "none", sm: "none", md: "block", lg: "block"}}><WebNavbar/></Box>
      <Box width="100%" display={{base: "block", sm: "block", md: "none", lg: "none"}}><ResponsiveNavbar/></Box>
    </>
  );
}
