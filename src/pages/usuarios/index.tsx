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
  SimpleGrid,
  HStack,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight, FiPlusCircle, FiSearch } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { datas } from '../../utils/data';
import { Pagination } from '@mantine/core';


const Users = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [users, setUsers] = useState(datas);
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
          <BreadcrumbLink href='#'>Usuários </BreadcrumbLink>
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
            <Text fontSize="1xl" fontWeight='bold'>Lista de usuários</Text>
          </Box>
          <Box>
          <HStack spacing='24px' justifyContent='flex-end'>
            <Button
              leftIcon={<FiPlusCircle />}
              colorScheme='red'
              variant="solid"
              onClick={onOpen}
            >
              Adicionar
            </Button>
            </HStack>
          </Box>
        </SimpleGrid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Perfil de acesso</Th>
                <Th textAlign='center'>Email</Th>
                <Th textAlign='center'>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign="center">{user.name}</Td>
                  <Td textAlign='center'>{user.active == true ? 'Ativo' : 'Desativado'}</Td>
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
      
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder='email' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tipo de sistema</FormLabel>
              <Input placeholder='tipo de sistema' />
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

export default Users;