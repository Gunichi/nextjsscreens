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
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiEdit, FiChevronLeft, FiChevronRight, FiSearch, FiPlay, FiPlusCircle } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { Pagination } from '@mantine/core';
import { Download } from 'phosphor-react';
import axios from 'axios';
import router from 'next/router';

const Ovpn = () => {

  type data = {
    id: number,
    username: string,
    block: boolean,
    ovpn: string,
    gunit: string,
  }


  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPage(page!);
  };

  useEffect(() => {
    axios.get('http://144.126.138.178/web/users/list/?page=1')
      .then((response) => {
        setData(response.data.result.items)
      })
  }, [])

  
  return ( 
    <SidebarWithHeader>
       <Breadcrumb mt={20}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Cadastro OVPN</BreadcrumbLink>
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
            <Text fontSize="1xl" fontWeight='bold'>OVPN</Text>
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
                <Th textAlign='center'>IP</Th>
                <Th textAlign='center'>Grupo de loja</Th>
                <Th textAlign='center'>Status</Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((item: data) => (
                <Tr key={item.id}>
                  <Td textAlign='center'>{item.username}</Td>
                  <Td textAlign='center'>{item.gunit}</Td>
                  <Td textAlign='center'>{item.block == false ? 'Ativo' : 'Desativado'}</Td>
                  <Td textAlign='center'>
                    <Button colorScheme='red' variant='solid' size='sm' mr={2}> 
                      <FiPlay />
                    </Button>
                    <Button colorScheme='red' variant='solid' size='sm'> 
                      <FiEdit />
                    </Button>
                    <Button 
                      colorScheme='red'
                      variant='solid'
                      size='sm'
                      ml={2}
                      onClick={() => router.push(`http://144.126.138.178/web/users/download/${item.ovpn}`)}
                    >
                      <Download size={20} />
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar sistema</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Usuário</FormLabel>
              <Input ref={initialRef} placeholder='Usuário' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Arquivo</FormLabel>
              <Input type='file' placeholder='File' size='sm' />
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


export default Ovpn;