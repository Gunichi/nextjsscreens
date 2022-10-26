import React, { useState } from 'react'
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  SimpleGrid,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { IoIosPaper } from "react-icons/io";

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { data } from '../../utils/data';
import router from 'next/router';
import { Pagination } from '@mantine/core';

const Cupons = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [users, setUsers] = useState(data);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);

  const handlePageChange = (page: number | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPage(page!);
  };

  return ( 
    <SidebarWithHeader>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Cupons</BreadcrumbLink>
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
        <Stack spacing={4}>
          <SimpleGrid columns={1} spacing={10}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<FiEdit color='gray.300' />}
              />
              <Input type='text' placeholder='Filtrar' />
            </InputGroup> 
          </SimpleGrid>
        </Stack>
      </Box>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"sm"}
        w={'100%'}
        p={8}
        mt={4}
        mb={4}
      >
        <SimpleGrid columns={1} spacing={10}>
          <Box w={'100%'} p={1}>
            <Text fontWeight='bold' fontSize='1xl'>Listagem de cupons</Text>
          </Box>
        </SimpleGrid>         
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>CPF</Th>
                <Th textAlign='center'>Nome</Th>
                <Th textAlign='center'>Loja favorita</Th>
                <Th textAlign='center'>Última compra</Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.cnpj}</Td>
                  <Td textAlign="center">{user.name}</Td>
                  <Td textAlign="center">Loja ***</Td>
                  <Td textAlign='center'>Compra 1</Td>
                  <Td textAlign='center'>
                    <Button
                      colorScheme='red'
                      variant='solid'
                      size='sm'
                      onClick={() => router.push(`cupons/${user.id}`)}    
                    >
                      <IoIosPaper />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>                    
        </TableContainer>
      </Box>
      <Pagination
        page={page}
        onChange={(page) => {handlePageChange(page)}}
        total={10}
        siblings={2}
        boundaries={0}      
        color='red.7'  
        position='right'
        sx={(theme) => ({
          '@media (max-width: 755px)': {
            justifyContent: 'center'
          },
        })}
      />
    </SidebarWithHeader>
    
  );
}

export default Cupons;