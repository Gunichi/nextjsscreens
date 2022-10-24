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
  ButtonGroup,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { sortBy } from 'sort-by-typescript';

import { FiPlay, FiEdit, FiPause, FiArrowDown, FiArrowUp, FiShare } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { data } from '../../utils/data';
import { Pagination } from '@mantine/core';
import XLSX from 'xlsx'
import axios from 'axios-jsonp-pro';

const Lojas = () => {

  
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onCloseEditOpen } = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCloseCreateOpen } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('')
  const [fantasyName, setFantasyName] = useState('')
  const [users, setUsers] = useState(data);
  const [isActive, setIsActive] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);
  const [order, setOrder] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderCnpj, setOrderCnpj] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const sortById = () => {
    setOrderName('')
    setOrderCnpj('')
    setOrderStatus('')
    if(orderId === 'asc'){
      setOrderId('desc')
      setUsers(users.sort(sortBy('id', 'desc')))
    }else if(orderId === 'desc'){
      setOrderId('')
      setUsers(users.sort(sortBy('id', 'asc')))
    }else{
      setOrderId('asc')
      setUsers(users.sort(sortBy('-id', 'asc')))
    }
  }

  const sortByName = () => {
    setOrderId('')
    setOrderCnpj('')
    setOrderStatus('')
    if(orderName === 'asc'){
      setOrderName('desc')
      setUsers(users.sort(sortBy('name', 'desc')))
    }else if(orderName === 'desc'){
      setOrderName('')
      setUsers(users.sort(sortBy('name', 'asc')))
      setOrder('asc')
      setUsers(users.sort(sortBy('id', 'desc')))
    }else{
      setOrderName('asc')
      setUsers(users.sort(sortBy('-name', 'asc')))
    }
  }

  const sortByCnpj = () => {
    setOrderId('')
    setOrderName('')
    setOrderStatus('')
    if(orderCnpj === 'asc'){
      setOrderCnpj('desc')
      setUsers(users.sort(sortBy('cnpj', 'desc')))
    }else if(orderCnpj === 'desc'){
      setOrderCnpj('')
      setUsers(users.sort(sortBy('cnpj', 'asc')))
      setOrder('asc')
      setUsers(users.sort(sortBy('id', 'desc')))
    }else{
      setOrderCnpj('asc')
      setUsers(users.sort(sortBy('-cnpj', 'asc')))
    }
  }

  const sortByStatus = () => {
    setOrderId('')
    setOrderName('')
    setOrderCnpj('')
    if(orderStatus === 'asc'){
      setOrderStatus('desc')
      setUsers(users.sort(sortBy('active', 'desc')))
    }else if(orderStatus === 'desc'){
      setOrderStatus('')
      setUsers(users.sort(sortBy('active', 'asc')))
      setOrder('asc')
      setUsers(users.sort(sortBy('id', 'desc')))
    }else{
      setOrderStatus('asc')
      setUsers(users.sort(sortBy('-active', 'asc')))
    }
  }

  const sortIcon = (order: string) => {
    if (orderId === 'asc') {
      return <FiArrowUp />;
    } else if (orderId === 'desc') {
      return <FiArrowDown />;
    } else {
      return null;
    }
  };

  const sortIconName = (order: string) => {
    if (orderName === 'asc') {
      return <FiArrowUp />;
    } else if (orderName === 'desc') {
      return <FiArrowDown />;
    } else {
      return null;
    }
  };

  const sortIconCnpj = (order: string) => {
    if (orderCnpj === 'asc') {
      return <FiArrowUp />;
    } else if (orderCnpj === 'desc') {
      return <FiArrowDown />;
    } else {
      return null;
    }
  };

  const sortIconStatus = (order: string) => {
    if (orderStatus === 'asc') {
      return <FiArrowUp />;
    } else if (orderStatus === 'desc') {
      return <FiArrowDown />;
    } else {
      return null;
    }
  };


  const handlePageChange = (page: number | undefined) => {
    setPage(page!);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setCnpj(e.target.value)
  }

  const findCnpj = () => { 
    axios.jsonp(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
    .then((response => {
      setFantasyName(response.nome)
    }))
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleEdit = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setId(user.id);
      setName(user.name);
      setCnpj(user.cnpj)
      onEditOpen();
    }
  };

  const handleActive = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setIsActive(!user.active);
      const newUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, active: !user.active };
        }
        return user;
      });
      setUsers(newUsers);
    }
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, 'Lojas');
    XLSX.writeFile(wb, 'lojas.xlsx');
  }

  /*const sortingById = (order: string) => {
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
          </Grid>
        </Stack>
        <br />     
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4}
        >
          <GridItem colSpan={5}>
            <Text fontSize='4x1' as='b'>Listagem de lojas</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
          <ButtonGroup variant='solid' spacing='6'>
            <Button 
              onClick={() => handleExport()} 
              colorScheme="red" 
              variant="solid" 
              mb={4} 
              mr={4}
              leftIcon={<FiShare />}
            >
              Exportar tabela
            </Button>
            <Button 
              colorScheme='red' 
              size='md'
              leftIcon={<FiEdit />}
              onClick={() => onCreateOpen()}
            >
              Adicionar loja
            </Button>           
          </ButtonGroup>
          </GridItem>
        </Grid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center' cursor='pointer' onClick={() => sortById()}>      
                  <HStack spacing={0} justifyContent='center'>
                    <Text>ID</Text>
                    <Text>{sortIcon(orderId)}</Text>
                  </HStack>
                </Th>
                <Th textAlign='center' cursor='pointer' onClick={() => sortByName()}>
                  <HStack spacing={0} justifyContent='center'>
                    <Text as='b'>Nome</Text> {sortIconName(orderName)}
                  </HStack>
                </Th>
                <Th textAlign='center' cursor='pointer' onClick={() => sortByCnpj()}>
                  <HStack spacing={0} justifyContent='center'>
                    <Text as='b'>CNPJ</Text> {sortIconCnpj(orderCnpj)}
                  </HStack>
                </Th>
                <Th textAlign='center' cursor='pointer' onClick={() => sortByStatus()}>
                  <HStack spacing={0} justifyContent='center'>
                    <Text as='b'>Status</Text> {sortIconStatus(orderStatus)}
                  </HStack>
                </Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.name}</Td>
                  <Td textAlign="center">{user.cnpj}</Td>
                  <Td textAlign='center'>{user.active == true ? 'Ativo' : 'Desativado'}</Td>
                  <Td textAlign='center'>
                    <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={() => handleEdit(user.id)} > 
                      <FiEdit />
                    </Button>
                    <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={(() => handleActive(user.id))}>
                      
                    
                      {user.active == true ? <FiPause /> : <FiPlay />}
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
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Grupo de loja</FormLabel>
              <Select placeholder='Selecione um grupo de loja'>
                {users.map(loja => 
                  <option value={loja.name}>{loja.name}</option>
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
                value={name}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>CNPJ</FormLabel>
              <Input 
                placeholder='CNPJ' 
                onBlur={findCnpj}
                value={cnpj}
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
              <Select placeholder='Selecione um grupo de loja' value={name}>
                {users.map(loja => 
                  <option value={loja.name}>{loja.name}</option>
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
    
  );
}

export default Lojas;