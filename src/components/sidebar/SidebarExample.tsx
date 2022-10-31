import React, { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Collapse,
} from '@chakra-ui/react';
import Link from "next/link";
import {
  FiCodesandbox,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMonitor,
  FiPlusCircle,
  FiServer,
  FiUsers,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {
  BsNewspaper
} from 'react-icons/bs';
import {
  IoManOutline
} from 'react-icons/io5';
import {
  SiOpenvpn 
} from 'react-icons/si';
import { BuildingStorefrontIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Lojas', icon: BuildingStorefrontIcon, href:'/lojas' },
  { name: 'Grupo de lojas', icon: BuildingOffice2Icon, href:'/lojas/grupos' },
  { name: 'Cupons', icon: BsNewspaper, href:'/cupons' },
  { name: 'Clientes', icon: IoManOutline, href: '/clientes'},
  { name: 'Sistemas', icon: FiCodesandbox, href: '/sistemas'},
  { name: 'OVPN', icon: SiOpenvpn, href: '/ovpn'},
  { name: 'Usuários', icon: FiUsers, href: '/usuarios'},
  { name: 'Operador', icon: FiServer, href: '/operador'},
];


export default function import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
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
import { FiCodesandbox, FiMenu, FiSearch, FiServer, FiUsers } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React, { ReactNode } from "react";
import Link from "next/link";
import { BuildingOffice2Icon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { IoManOutline } from "react-icons/io5";
import { SiOpenvpn } from "react-icons/si";

export default function Sidebar({ children }: { children: ReactNode }) {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      py="3"
      cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
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
          Choc UI
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
        <Link href='/lojas' passHref>
          <NavItem icon={FiServer}> Operador </NavItem>
        </Link>
        
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Monitoramento
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
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
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>
        <Box p="4">
        {children}

        </Box>
      </Box>
    </Box>
  );
}
({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {  

  const integrations = useDisclosure();

  return (
    <Box
    transition="3s ease"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}>
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.href} >
          {link.name}
        </NavItem>
      ))}
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'red.400',
          color: 'white',
        }}
        onClick={integrations.onToggle}
        {...rest}>
        <Icon as={FiMonitor} fontSize="20" mr={2} alignContent='center' />
          Monitoramento
          <Collapse in={integrations.isOpen}>
            <NavItem icon={FiPlusCircle} link="/teste" _hover={{bg: 'red.500', color: 'white'}}>      
              Relatório 1
            </NavItem>
        </Collapse>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {

  const router = useRouter();
  const currentRoute = router.pathname;
  const [active, setActive] = useState(currentRoute);

  return (
    <Link href={link} passHref >
      <Flex
        bg={active == link ? 'red.400' : 'white'}
        color={active == link ? 'white' : 'black'}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'red.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      pos="fixed" top="0" left="0" right="0" zIndex={999}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button leftIcon={<FiLogOut />}  size='md' colorScheme='red' variant='solid'>
          Logout
        </Button>
      
      </HStack>
    </Flex>
  );
};