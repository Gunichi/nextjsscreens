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
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SidebarWithHeader from '../../../components/sidebar/sidebar';
import { data } from '../../../utils/data';
import Pagination from '@choc-ui/paginator';
import { useRouter } from 'next/router';

const GroupDetails = () => {

  const router = useRouter()
  const id = router.query.id

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 
  const [users, setUsers] = useState(data);
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
          <BreadcrumbLink href='#'>Lojas / Grupos de Lojas / {id} </BreadcrumbLink>
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
            <GridItem colStart={6} colEnd={6} h='10'>
              <Checkbox />
            </GridItem>
          </Grid>
        </Stack>
        <br />     
        <Grid 
          templateColumns='repeat(5, 1fr)' 
          gap={4}
        >
          <GridItem colSpan={5}>
            <Text fontSize='4x1' as='b'>Listagem</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
            <Button 
              colorScheme='red' 
              size='md'
              onClick={() => onOpen()}
            >
              <FiEdit /> Adicionar parâmetro
            </Button>
          </GridItem>
        </Grid>
        <TableContainer mt={4}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th textAlign='center'>Id</Th>
                <Th textAlign='center'>Tipo</Th>
                <Th textAlign='center'>Sistema</Th>
              </Tr>
            </Thead>
            <Tbody>
                <Tr>
                  <Td textAlign='center'>{id}</Td>
                  <Td textAlign="center">Infos</Td>
                  <Td textAlign='center'>Infos</Td>
                </Tr>
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