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

import { FiEdit, FiChevronLeft, FiChevronRight, FiSearch, FiPlusCircle } from 'react-icons/fi'
import SidebarWithHeader from '../../components/sidebar/sidebar';
import { datas } from '../../utils/data';
import { Pagination } from '@mantine/core';
import axios from 'axios';

const Sistemas = () => {

  type data = {
    id: number,
    system: string,
    type : string,
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)  

  const [page , setPage] = useState(1);
  const [data, setData] = useState([]);

  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);
  

  useEffect(() => {
    axios.get('http://144.126.138.178/web/systems/list/?page=1')
    .then((response) => {
      setData(response.data.result.items)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(data)


  const handlePageChange = (page: number | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPage(page!);
  };


  return ( 
    <SidebarWithHeader>
      <Breadcrumb mt={20}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Cadastro de sistemas</BreadcrumbLink>
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
        <InputGroup size="md" >
          <InputLeftElement
            pointerEvents="none"
            children={<FiSearch color="gray.300" />}
          />
          <Input type="text" placeholder="Pesquisar" />
        </InputGroup>
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
            <Text fontSize="1xl" fontWeight='bold'>Listagem de Sistemas</Text>
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
                <Th textAlign='center'>Sistema</Th>
                <Th textAlign='center'>Banco de dados</Th>
                <Th textAlign='center'>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((item: data) => (
                <Tr key={item.id}>
                  <Td textAlign='center'>{item.system}</Td>
                  <Td textAlign='center'>{item.type}</Td>
                  <Td textAlign='center'> 
                    <Button 
                      colorScheme='red'
                      size='sm'
                    >
                      <FiEdit />
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
              <FormLabel>Sistema</FormLabel>
              <Input ref={initialRef} placeholder='Sistema' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Banco de dados</FormLabel>
              <Input placeholder='Banco de dados' />
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


export default Sistemas;