import { 
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { ReactNode } from "react";

export default function BoxComponent({ children }: { children: ReactNode }) {  
  return (
    <Box 
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"sm"}
      w={"md"}
      p={8}      
      h={[300, 400, 500]}
      >
        {children}
    </Box>
  );
}
 
