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
  FormControl,
  SimpleGrid,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight, FiPause, FiSettings, FiSearch, FiPlusCircle } from 'react-icons/fi'
import { VscSettings } from "react-icons/vsc";
import SidebarWithHeader from '../../../components/sidebar/sidebar';
import { data } from '../../../utils/data';
import Pagination from '@choc-ui/paginator';
import { useRouter } from 'next/router';


const gruposDeLojas = () => {

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onCloseEditOpen } = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCloseCreateOpen } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 
  const [users, setUsers] = useState(data);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);
  const router = useRouter();

  const handlePageChange = (page: number | undefined) => {
    setPage(page!);
  };

  const handleEdit = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setId(user.id);
      setName(user.name);
      onEditOpen();
    }
  };

  return ( 
    <SidebarWithHeader>
      <Breadcrumb>
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
          <SimpleGrid columns={1} spacing={10}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<FiSearch color='gray.300' />}
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
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <Text fontSize="1xl" fontWeight='bold'>Grupo de lojas</Text>
          </Box>
          <Box textAlign="right">
            <Button
              leftIcon={<FiPlusCircle />}
              colorScheme='red'
              variant="solid"
              onClick={onCreateOpen}
            >
              Adicionar grupo de loja
            </Button>
          </Box>
        </SimpleGrid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Id</Th>
                <Th textAlign='center'>Nomes</Th>
                <Th textAlign='center'>Status</Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.name}</Td>
                  <Td textAlign='center'>{user.active == true ? 'Ativo' : 'Desativado'}</Td>
                  <Td textAlign='center'>
                  <Button 
                    colorScheme='red' 
                    variant='solid' 
                    size='sm' 
                    mr={2} 
                    onClick={
                      () => handleEdit(user.id)
                    }
                  > 
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
                    <Button 
                      colorScheme='red' 
                      variant='solid' 
                      size='sm' 
                      ml={2} 
                      onClick={() => router.push(`grupos/${user.id}`)}
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


       {/* Modal de criação de loja */}
       <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isCreateOpen}
        onClose={onCloseCreateOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar grupo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl mt={4}>
              <FormLabel>Nome</FormLabel>
              <Input 
                placeholder='Nome' 
              />
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

export default gruposDeLojas;