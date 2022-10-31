import React, { forwardRef, useEffect, useState } from 'react'
import {
  useColorModeValue,
  Box,
  Grid,
  GridItem,
  Button,
  Stack,
  InputGroup, 
  Input,
  InputLeftElement,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  FormLabel,
  Select,
  SimpleGrid,
  HStack,
  systemProps,
  Spinner,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiEdit, FiChevronLeft, FiChevronRight, FiPlusCircle } from 'react-icons/fi'
import SidebarWithHeader from '../components/sidebar/sidebar';
import Pagination from '@choc-ui/paginator';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

const GroupDetails = () => {

  interface group {
    id: number,
    type: string,
    host: string,
    port: number,
    user: string,
    password: string,
    db: string,
    db2: string,
    systems: {
      system: string,
    }
  }

  const [group, setGroup] = useState<group[]>([]);

  useEffect(() => {
    axios.get(`http://144.126.138.178/web/parameters/gunit/list/10`)
      .then(res => {
        setGroup([res.data.result]);
      })
  }, [])


  console.log(group)

  const router = useRouter()
  const id = router.query.id

  const [loading, setLoading] = useState(false)



  if (loading) {
    return (
      <Box justifyContent="center" alignItems="center" display="flex" height="100vh">
        <Spinner
          emptyColor='gray.200'
          color='red.500'
          size='xl'
        />
      </Box>
    )
  } else {
    return ( 
      <SidebarWithHeader>
        <Breadcrumb mt={20} separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/lojas'>Lojas</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/lojas/grupos'>Grupo de lojas</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box 
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"sm"}
          w={'100%'}
          p={8}
          mt={4}
          mb={4}
        >
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontSize="1xl" fontWeight='bold'>Listagem</Text>
            </Box>
            <Box>
            <HStack spacing='24px' justifyContent='flex-end'>
              <Button
                leftIcon={<FiPlusCircle />}
                colorScheme='red'
                variant="solid"
              >
                Adicionar parâmetro
              </Button>
              </HStack>
            </Box>
          </SimpleGrid>
          <TableContainer mt={4}>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th textAlign='center'>Tipo</Th>
                  <Th textAlign='center'>Sistema</Th>
                  <Th textAlign='center'>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {group?.map((item) => (
                  <Tr>
                    <Td textAlign='center'>{item.type}</Td>
                    <Td textAlign='center'>{item.systems.system}</Td>
                    <Td textAlign='center'> </Td>
                  </Tr>
                ))}


               
              </Tbody>
            </Table>                    
          </TableContainer>
        </Box>
      

      </SidebarWithHeader>
    );
  }
}

export default GroupDetails;