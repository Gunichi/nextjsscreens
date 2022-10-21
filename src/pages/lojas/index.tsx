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
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { sortBy } from 'sort-by-typescript';

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight, FiPause, FiShoppingCart } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { data } from '../../utils/data';
import { Pagination } from '@mantine/core';
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
  const [order, setOrder] = useState('asc');

  const sortingById = (order: string) => {
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
      setOrder('desc');
      setUsers(users.sort(sortBy('name')));
    } else {
      setOrder('asc');
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


  return ( 
    <SidebarWithHeader>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Lojas</BreadcrumbLink>
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
            <Button 
              colorScheme='red' 
              size='md'
              onClick={() => {
                onCreateOpen()
              }}
            >
              <FiEdit /> Adicionar loja
            </Button>
          </GridItem>
        </Grid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center' cursor='pointer' onClick={sortingById.bind(null, order)}>Id </Th>
                <Th textAlign='center' cursor='pointer' onClick={() => sortingByName(order)}>Nome</Th>
                <Th textAlign='center' cursor='pointer' onClick={sortingByCnpj.bind(null, order)}>CNPJ</Th>
                <Th textAlign='center' cursor='pointer' onClick={sortingByStatus.bind(null, order)}>Status</Th>
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
                  {user.active == true ? (
                    <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={() => setIsActive(!isActive)}>
                      {isActive ? <FiPause /> : <FiPlay />}
                    </Button>
                  ) : (
                    <Button colorScheme='red' variant='solid' size='sm' mr={2} onClick={() => setIsActive(!isActive)}>
                      {isActive ? <FiPlay /> : <FiPause />}
                    </Button>
                  )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>                    
        </TableContainer>
      </Box>

      <Pagination
        page={page}
        onChange={(page) => {
          handlePageChange(page);
        }}
        total={pageSize}
        siblings={2}
        boundaries={0}      
        color='red.7'  
        position='right'
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