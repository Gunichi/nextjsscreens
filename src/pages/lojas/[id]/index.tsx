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
  Select,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiEdit, FiChevronLeft, FiChevronRight, FiPlusCircle } from 'react-icons/fi'
import SidebarWithHeader from '../../../components/sidebar/sidebar';
import Pagination from '@choc-ui/paginator';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

const GroupDetails = () => {

  type data = {
    id: number,
    gunit: string,
    block : boolean,
  }

  const router = useRouter()
  const id = router.query.id

  const [data , setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    axios.get(`http://144.126.138.178/web/parameters/unit/list/5`)
      .then(response => {
        setData(response.data)
      })
  }, [])

  return ( 
    <SidebarWithHeader>
      <Breadcrumb mt={20} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/lojas'>Lojas</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{id}</BreadcrumbLink>
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
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <Text fontSize="1xl" fontWeight='bold'>Listagem</Text>
          </Box>
          <Box>
          <HStack spacing='24px' justifyContent='flex-end'>
            <Button
              leftIcon={<FiPlusCircle />}
              colorScheme='red'
              variant="solid"
              onClick={onOpen}
            >
              Adicionar parâmetro
            </Button>
            </HStack>
          </Box>
        </SimpleGrid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Id</Th>
                <Th textAlign='center'>Tipo</Th>
                <Th textAlign='center'>Sistema</Th>
              </Tr>
            </Thead>
            <Tbody >
            {posts.map((user: data) => (
                  <Tr key={user.id}>
                    <Td textAlign='center'>{user.id}</Td>
                    <Td textAlign="center">{user.gunit}</Td>
                    <Td textAlign='center'>{user.block == true ? 'Ativo' : 'Desativado'}</Td>
                  </Tr>
              ))}
            </Tbody>
          </Table>                    
        </TableContainer>
      </Box>
      
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent maxH='70vh'>
          <ModalHeader>Adicionar grupo de loja</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <FormLabel>Tipo</FormLabel>
        <Input placeholder='tipo' />

        <FormLabel mt={2}>Host</FormLabel>
        <Input placeholder='host' />

        <FormLabel mt={2}>Porta</FormLabel>
        <Input placeholder='porta' />

        <FormLabel mt={2}>Usuário</FormLabel>
        <Input placeholder='user' />

        <FormLabel mt={2}>Senha</FormLabel>
        <Input placeholder='senha' />

        <FormLabel mt={2}>DB</FormLabel>
        <Input placeholder='db' />

        <FormLabel mt={2}>DB2</FormLabel>
        <Input placeholder='db2' />

        <FormLabel mt={2}>Sistema</FormLabel>
          <Select placeholder='Select option'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
            
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

export default GroupDetails;