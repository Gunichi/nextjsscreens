import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Box, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';

function Layout() {
  const { collapseSidebar } = useProSidebar();

  return (
    <>

        <Sidebar backgroundColor='transparent'>
          <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
          <Menu>
            <MenuItem 
              icon={<FiCalendar /> }
            >Calendar</MenuItem>
            <MenuItem> Calendar</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Box>
        </Sidebar>
        <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main>
        </>

  );
}

export default Layout;