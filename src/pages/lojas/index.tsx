import React, { useState, useEffect } from 'react'
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
  
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
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
  Select,
  SimpleGrid,
  HStack,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { sortBy } from 'sort-by-typescript';

import { FiPlay, FiEdit, FiPause, FiArrowDown, FiArrowUp, FiSearch, FiPlus } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { Pagination } from '@mantine/core';
import XLSX from 'xlsx'
import axios from 'axios-jsonp-pro';
import { DownloadSimple } from 'phosphor-react';
import { VscSettings } from 'react-icons/vsc';
import { useRouter } from 'next/router';

const Lojas = () => {

  type data = {
    id: number,
    unit: string,
    corporate: string,
    cnpj: string,
    code: string,
    block: boolean,
  }

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onCloseEditOpen } = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCloseCreateOpen } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [id, setId] = useState(0);
  const [unit, setUnit] = useState('');
  const [corporate, setCorporate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [fantasyName, setFantasyName] = useState('')
  const [isActive, setIsActive] = useState(true);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderCnpj, setOrderCnpj] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);
  
  /*const sortById = () => {
    setOrderName('')
    setOrderCnpj('')
    setOrderStatus('')
    if(orderId === 'asc'){
      setOrderId('desc')
      setUsers(users.sort(sortBy('id', 'desc')))
    }else{
      setOrderId('asc')
      setUsers(users.sort(sortBy('-id', 'asc')))
    }
  }*/

  const sortById = () => {
    setOrderCnpj('')
    setOrderStatus('')
    if(orderId === 'asc'){
      setOrderId('desc')
      setData(data.sort(sortBy('id', 'desc')))
    } else {
      setOrderId('asc')
      setData(data.sort(sortBy('-id', 'asc')))
    }
  }

  //Get total number of pages


  const sortByName = () => {
    setOrderId('')
    setOrderCnpj('')
    setOrderStatus('')
    if(orderName === 'asc'){
      setOrderName('desc')
      setData(data.sort(sortBy('unit', 'desc')))
    }else {
      setOrderName('asc')
      setData(data.sort(sortBy('-unit', 'asc')))
    }
  }

  const sortByCnpj = () => {
    setOrderId('')
    setOrderName('')
    setOrderStatus('')
    if(orderCnpj === 'asc'){
      setOrderCnpj('desc')
      setData(data.sort(sortBy('cnpj', 'desc')))
    } else {
      setOrderCnpj('asc')
      setData(data.sort(sortBy('-cnpj', 'asc')))
    }
  }

  const sortByStatus = () => {
    setOrderId('')
    setOrderName('')
    setOrderCnpj('')
    if(orderStatus === 'asc'){
      setOrderStatus('desc')
      setData(data.sort(sortBy('block', 'desc')))
    }else{
      setOrderStatus('asc')
      setData(data.sort(sortBy('-block', 'asc')))
    }
  }

  const sortingIcon = (orderId: string, orderName: string, orderCnpj: string, orderStatus: string) => {
    if (orderId === 'asc' || orderName === 'asc' || orderCnpj === 'asc' || orderStatus === 'asc') {
      return <FiArrowUp />;
    } else {
      return <FiArrowDown />;
    }
  };

  const handlePageChange = (page: number | undefined) => {
    setPage(page!);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setCnpj(e.target.value)
  }

  const handleEdit = (
    id: number, 
    unit: string,
    corporate: string,
    cnpj: string,
  ) => {
    setId(id);
    setUnit(unit);
    setCorporate(corporate);
    setCnpj(cnpj);
    onEditOpen();
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Lojas');
    XLSX.writeFile(wb, 'lojas.xlsx');
  }

  /* const sortingById = (order: string) => {
    if (order === 'asc') {
      setOrder('desc');
      setUsers(users.sort(sortBy('id')));
    } else {
      setOrder('asc');
      setUsers(users.sort(sortBy('-id')));
    }
  };

  const sortingByName = (order: string) => {
    if (order === 'asc') {
      setOrderName('desc');
      setUsers(users.sort(sortBy('name')));
    } else {
      setOrderName('asc');
      setUsers(users.sort(sortBy('-name')));
    }
  };

  const sortingByCnpj = (order: string) => {
    if (order === 'asc') {
      setOrder('desc');
      setUsers(users.sort(sortBy('cnpj' || 'id')));
    } else {
      setOrder('asc');
      setUsers(users.sort(sortBy('-cnpj')));
    }
  }; 

  const sortingByStatus = (order: string) => {
    if (order === 'asc') {
      setOrder('desc');
      setUsers(users.sort(sortBy('active')));
    } else {
      setOrder('asc');
      setUsers(users.sort(sortBy('-active')));
    }
  }; */

  const findCnpj = () => { 
    axios.jsonp(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
    .then((response => {
      setFantasyName(response.nome)
    }))
    .catch(function (error) {
      console.log(error);
    });
  }

  const findCnpj2 = () => {
    const formatCnpj = cnpj.replace(/[^\d]+/g,'');
    console.log(formatCnpj)

    axios.jsonp(`https://receitaws.com.br/v1/cnpj/${formatCnpj}`)
    .then((response => {
      setCorporateName(response.nome)
    }))
    .catch(function (error) {
      console.log(error);
    });
  }

  //Select for sorting asc or desc by id or name or cnpj or status 
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'id') {
      sortById();
    } else if (value === 'name') {
      sortByName();
    } else if (value === 'cnpj') {
      sortByCnpj();
    } else if (value === 'status') {
      sortByStatus();
    }
  };

  //Button change the select sort to asc or desc
  const handleButton = () => {
    if (orderId === 'asc') {
      console.log(orderId)
      sortById();
    } else if (orderId === 'desc') {
      console.log(orderId)
      sortById();
    } else if (orderName === 'asc') {
      console.log(orderName + 'aa')
      sortByName();
    } else if (orderName === 'desc') {
      console.log(orderName + 'bb')
      sortByName();
    } else if (orderCnpj === 'asc') {
      console.log(orderCnpj)
      sortByCnpj();
    } else if (orderCnpj === 'desc') {
      console.log(orderCnpj)
      sortByCnpj();
    } else if (orderStatus === 'asc') {
      console.log(orderStatus)
      sortByStatus();
    } else if (orderStatus === 'desc') {
      console.log(orderStatus)
      sortByStatus();
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://144.126.138.178/web/units/list/?page=1')
      .then(response => {
        setData(response.data.result.items)
        setLoading(false)
      })
  }, [])

  //Change from active     
      
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
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/lojas'>Lojas</BreadcrumbLink>
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
            <SimpleGrid columns={2} spacing={10}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FiSearch color='gray.300' />}
                />
                <Input type='text' placeholder='Filtrar' />
              </InputGroup> 
              <HStack spacing='24px' justifyContent='flex-end'>
                <Box w='200px'>
                  <Select onChange={handleSelect}>
                    <option selected hidden disabled value="">Ordenar por</option>
                    <option value='id'>ID</option>
                    <option value='name'>Nome</option>
                    <option value='cnpj'>CNPJ</option>
                    <option value='status'>Status</option>
                  </Select>
                </Box>
                <Box>
                  <Button colorScheme='red'  size='md' onClick={handleButton}>
                    {sortingIcon(
                      orderId,
                      orderName,
                      orderCnpj,
                      orderStatus
                    )}
                  </Button>
                </Box>
              </HStack>
            </SimpleGrid>         
          </Stack>   
          </Box>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            w={'100%'}
            p={8}
            mt={4}
            mb={4}
          >
          <SimpleGrid columns={[2, null, 2]} spacing={10}>
            <Box>
              <Text fontSize='1xl' fontWeight='bold'>
                Listagem de lojas
              </Text>
            </Box>
            <HStack spacing='24px' justifyContent='flex-end'>
              <Box>
                <Button colorScheme='red'  variant='outline' size='md' onClick={handleExport}>
                  <DownloadSimple size={20} weight='bold' />
                </Button>
              </Box>
              <Box>
                <Button 
                  colorScheme='red'               
                  leftIcon={<FiPlus />}
                  size='md' 
                  onClick={onCreateOpen}
                >
                  Adicionar loja
                </Button>
              </Box>
            </HStack>
          </SimpleGrid> 
          <TableContainer mt={4}>
            <Table size='sm' mt={4}>
              <Thead>
                <Tr>
                  <Th textAlign='center' cursor='pointer' onClick={() => sortById()}>      
                    <HStack spacing={0} justifyContent='center'>
                      <Text>ID</Text>
                    </HStack>
                  </Th>
                  <Th textAlign='center' cursor='pointer' onClick={() => sortByName()}>
                    <HStack spacing={0} justifyContent='center'>
                      <Text as='b'>Nome</Text>
                    </HStack>
                  </Th>
                  <Th textAlign='center' cursor='pointer' onClick={() => sortByCnpj()}>
                    <HStack spacing={0} justifyContent='center'>
                      <Text as='b'>CNPJ</Text> 
                    </HStack>
                  </Th>
                  <Th textAlign='center' cursor='pointer' onClick={() => sortByStatus()}>
                    <HStack spacing={0} justifyContent='center'>
                      <Text as='b'>Status</Text> 
                    </HStack>
                  </Th>
                  <Th textAlign='center'>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts.map((user: data) => (
                  <Tr key={user.id}>
                    <Td textAlign='center'>{user.id}</Td>
                    <Td textAlign="center">{user.unit}</Td>
                    <Td textAlign="center">{user.cnpj}</Td>
                    <Td textAlign='center'>{user.block == false ? 'Ativo' : 'Desativado'}</Td>
                    <Td textAlign='center'>
                      <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={() => [handleEdit(
                        user.id,
                        user.unit,
                        user.corporate,
                        user.cnpj,                  
                        ), findCnpj2()]} > 
                        <FiEdit />
                      </Button>
                      <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={(() => console.log('a'))}>
                        {user.block == false ? <FiPause /> : <FiPlay />}
                      </Button>
                      <Button 
                        colorScheme='red' 
                        variant='solid' 
                        size='sm' 
                        mr={2} 
                        onClick={() => router.push(`lojas/${user.id}`)}
                      > 
                        <VscSettings />
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
          total={totalPages}
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
        


        {/* Modal de criação de loja */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isCreateOpen}
          onClose={onCloseCreateOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl mt={4}>
                <FormLabel>Nome</FormLabel>
                <Input 
                  placeholder='nome' 
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>CNPJ</FormLabel>
                <Input 
                  placeholder='CNPJ' 
                  onBlur={findCnpj}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Razão social</FormLabel>
                <Input 
                  isReadOnly 
                  placeholder='Razão social'
                  value={fantasyName}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Grupo de loja</FormLabel>
                <Select placeholder='Selecione um grupo de loja'>
                  {data.map((user: data) => 
                    <option value={user.unit}>{user.unit}</option>
                  )}
                </Select>
              </FormControl>
              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='red' mr={3}>
                Salvar
              </Button>
              <Button onClick={onCloseCreateOpen}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal Editar Loja */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isEditOpen}
          onClose={onCloseEditOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl mt={4}>
                <FormLabel>Nome</FormLabel>
                <Input 
                  placeholder='nome' 
                  value={unit}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>CNPJ</FormLabel>
                <Input 
                  placeholder='CNPJ' 
                  onBlur={findCnpj2}
                  value={cnpj}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Razão social</FormLabel>
                <Input 
                  isReadOnly 
                  placeholder='Razão social'
                  value={corporateName}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Grupo de loja</FormLabel>
                <Select placeholder='Selecione um grupo de loja' value={unit}>
                  {data.map((user: data) => 
                    <option value={user.unit}>{user.unit}</option>
                  )}
                </Select>
              </FormControl>
              
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='red' mr={3}>
                Salvar
              </Button>
              <Button onClick={onCloseEditOpen}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    )
  }
}

export default Lojas;