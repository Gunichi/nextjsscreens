import {
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill, BsNewspaper } from "react-icons/bs";
import { FiCodesandbox, FiLogOut, FiMenu, FiMonitor, FiSearch, FiServer, FiUsers } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { BuildingOffice2Icon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { IoManOutline } from "react-icons/io5";
import { SiOpenvpn } from "react-icons/si";
import { useRouter } from "next/router";

export default function Sidebar({ children }: { children: ReactNode }) {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();  
  
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;

    const router = useRouter();
    const currentRoute = router.pathname;
    const [active, setActive] = useState(currentRoute);
    
    return (
      <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      bg={active === props.href ? "red.400" : "white"}
      py="3"
      cursor="pointer"
        color={active === props.href ? "white" : "gray.600"}
        _hover={{
          bg: useColorModeValue("red.400", "gray.900"),
          color: useColorModeValue("white", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: useColorModeValue("white", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          LOGO
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Link href='/lojas' passHref>
          <NavItem icon={BuildingStorefrontIcon}> Lojas </NavItem>
        </Link>
        <Link href='/lojas/grupos' passHref>
          <NavItem icon={BuildingOffice2Icon}> Grupo de lojas </NavItem>
        </Link>        
        <Link href='/cupons' passHref>
          <NavItem icon={BsNewspaper}> Cupons </NavItem>
        </Link>
        <Link href='/clientes' passHref>
          <NavItem icon={IoManOutline}> Clientes </NavItem>
        </Link>        
        <Link href='/sistemas' passHref>
          <NavItem icon={FiCodesandbox}> Sistemas </NavItem>
        </Link>
        <Link href='/ovpn' passHref>
          <NavItem icon={SiOpenvpn}> OVPN </NavItem>
        </Link>
        <Link href='/usuarios' passHref>
          <NavItem icon={FiUsers}> Usuários </NavItem>
        </Link>
        <Link href='/operador' passHref>
          <NavItem icon={FiServer}> Operador </NavItem>
        </Link>
        
        <NavItem icon={FiMonitor} onClick={integrations.onToggle}>
          Monitoramento
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <Link href='/teste' passHref>
            <NavItem pl="12" py="2">
              Relatório 1
            </NavItem>
          </Link>
        </Collapse>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          pos="fixed" 
          top="0"
          left="0"
          right="0"
          zIndex={999}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            
          </InputGroup>

          <Flex align="center">
            <Button leftIcon={<FiLogOut />}  size='md' colorScheme='red' variant='solid'>
              Logout
            </Button>
          </Flex>
        </Flex>

        <Box p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
