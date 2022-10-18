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
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Select,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight, FiPause } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { data } from '../../utils/data';
import Pagination from '@choc-ui/paginator';
import axios from 'axios-jsonp-pro';

const Lojas = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [users, setUsers] = useState(data);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);
  const [cnpj, setCnpj] = useState('')
  const [fantasyName, setFantasyName] = useState('')

  const handlePageChange = (page: number | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPage(page!);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setCnpj(e.target.value)
  }

  const findCnpj = () => { 
    axios.jsonp(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
  .then(function (response) {
    setFantasyName(response.nome)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

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
              onClick={onOpen}
            >
              <FiEdit /> Adicionar loja
            </Button>
          </GridItem>
        </Grid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Id</Th>
                <Th textAlign='center'>Nomes</Th>
                <Th textAlign='center'>CNPJ</Th>
                <Th textAlign='center'>Status</Th>
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
                    <Button colorScheme='red' variant='solid' size='sm' mr={2}> 
                      <FiEdit />
                    </Button>
                    {user.active == true ?
                      <Button colorScheme='red' variant='solid' size='sm'> 
                        <FiPause />
                      </Button>
                    :
                      <Button colorScheme='red' variant='solid' size='sm'> 
                        <FiPlay />
                      </Button>
                    }
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
        total={data.length}
        paginationProps={{
          display: "flex",
          justifyContent: "flex-end"
        }}
        colorScheme="red"
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl mt={4}>
              <FormLabel>Nome</FormLabel>
              <Input placeholder='nome' />
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
              <FormLabel>Selecione</FormLabel>
              <Select placeholder='Select option'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidebarWithHeader>
    
  );
}

export default Lojas;