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
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';

import { IoIosPaper } from "react-icons/io";

import SidebarWithHeader from '../../components/sidebar/sidebar';
import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Pagination from '@choc-ui/paginator';
import router from 'next/router';
import { clienteCoupons } from '../../utils/clientsCoupons';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Cupons = () => {

  const router = useRouter()
  const id = router.query.id
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [users, setUsers] = useState(clienteCoupons);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);

  const handlePageChange = (page: number | undefined) => {
    setPage(page!);
  };

  return ( 
    <SidebarWithHeader>
      <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/lojas'>Lojas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='/lojas/grupos'>Grupo de lojas</BreadcrumbLink>
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
          <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem colSpan={4} h='10'>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FiEdit color='gray.300' />}
                />
                <Input type='text' placeholder='Filtrar' />
              </InputGroup> 
            </GridItem>
            <GridItem colStart={6} colEnd={6} h='10'>
              <Checkbox />
            </GridItem>
          </Grid>
        </Stack>
        <br />     
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4}
        >
          <GridItem colSpan={5}>
            <Text fontSize='4x1' as='b'>Listagem de cupons</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
          </GridItem>
        </Grid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Número Cupom</Th>
                <Th textAlign='center'>Número PDV</Th>
                <Th textAlign='center'>Valor total</Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.pdv}</Td>
                  <Td textAlign="center">R$ {user.totalValue}</Td>
                  <Td textAlign='center'>
                    <Button
                      colorScheme='red'
                      variant='solid'
                      size='sm'
                      onClick={() => router.push(`/cupons/${user.id}`)}
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
        current={page}
        onChange={(page) => {
          handlePageChange(page);
        }}
        pageSize={pageSize}
        total={clienteCoupons.length}
        paginationProps={{
          display: "flex",
          justifyContent: "flex-end"
        }}
        pageNeighbours={2}
        colorScheme="red"
      />
    </SidebarWithHeader>
    
  );
}

export default Cupons;