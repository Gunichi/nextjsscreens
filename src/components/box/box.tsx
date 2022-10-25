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
      w={"sm"}
      p={8}      
      height={[
        "100%", // base
        "50%", // 480px upwards
        "25%", // 768px upwards
        "15%", // 992px upwards
      ]}
      >
    </Box>
  );
}
 
