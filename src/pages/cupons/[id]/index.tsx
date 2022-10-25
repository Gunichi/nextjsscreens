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
  Divider,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';

import { IoIosPaper } from "react-icons/io";

import SidebarWithHeader from '../../../components/sidebar/sidebar';
import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Pagination from '@choc-ui/paginator';
import router from 'next/router';
import { clienteCoupons } from '../../../utils/clientsCoupons';

const CuponsId = () => {

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
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Cupons</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Cupom {id} </BreadcrumbLink>
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
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4}
        >
          <GridItem colSpan={5}>
            <Text fontSize='4x1' as='b'>Detalhes dos cupons</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
          </GridItem>
        </Grid>
        <SimpleGrid columns={7} mt={4}>
          <Box maxW='sm' ml={0} overflow='hidden'>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Valor total
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                R$ 100,00
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' overflow='hidden' ml={4}>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  PDV 
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                PDV
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' ml={4} overflow='hidden'>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Nome da loja
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                Loja 1
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' ml={4} overflow='hidden'>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Cód. Operador
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                1
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' ml={4} overflow='hidden'>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Nome operador
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                <Text>
                  Name
                </Text>
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' overflow='hidden' ml={5}>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Criado em
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                R$ 100,00
              </Box>
            </Box>
          </Box>
          <Box maxW='sm' overflow='hidden' ml={5}>
            <Box>
              <Box display='flex' alignItems='baseline'>   
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                >
                  Num. Cupom
                </Box>
              </Box>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
                R$ 100,00
              </Box>
            </Box>
          </Box>
        
        </SimpleGrid>
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
        {/*<Stack spacing={4} mt={5}>
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
        </Stack>*/}
        <TableContainer mt={4} borderWidth='2px' rounded='md'>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Cód. Produto</Th>
                <Th textAlign='center'>Ean do produto</Th>
                <Th textAlign='center'>Desc. produto</Th>
                <Th textAlign='center'>Quantidade</Th>
                <Th textAlign='center'>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.pdv}</Td>
                  <Td textAlign="center">Descrição</Td>
                  <Td textAlign='center'> 1 </Td>
                  <Td textAlign='center'> R$ {user.totalValue} </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>                         
        </TableContainer>
        <Divider mt={4} />     
        <TableContainer mt={4}>
          <Table size='sm' rounded='md' borderRadius='md'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Cód. finalizadora</Th>
                <Th textAlign='center'>Finalizador</Th>
                <Th textAlign='center'>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.pdv}</Td>
                  <Td textAlign="center">R$ {user.totalValue}</Td>
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

export default CuponsId;