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
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiPlay, FiEdit, FiChevronLeft, FiChevronRight, FiPause, FiSettings } from 'react-icons/fi'
import { VscSettings } from "react-icons/vsc";
import SidebarWithHeader from '../../../components/sidebar/sidebar';
import { data } from '../../../utils/data';
import Pagination from '@choc-ui/paginator';
import { Modal } from '@mantine/core';
import { useRouter } from 'next/router';


const gruposDeLojas = () => {

  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState(data);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const posts = users.slice(offset, offset + pageSize);
  const router = useRouter();
  const [name, setName] = useState('Eu')
  const [dataEdit, setDataEdit] = useState({});


  const handlePageChange = (page: number | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setPage(page!);
  };


  return ( 
    <SidebarWithHeader>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Lojas / Grupos de Lojas</BreadcrumbLink>
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
            <Text fontSize='4x1' as='b'>Grupo de lojas</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
            <Button 
              colorScheme='red' 
              size='md'
              onClick={() => setOpened(true)}
            >
              <FiEdit /> Adicionar grupo de loja
            </Button>
          </GridItem>
        </Grid>
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
              {posts.map(({ id, name, active }, index) => (
                <Tr key={id}>
                  <Td textAlign='center'>{id}</Td>
                  <Td textAlign="center">{name}</Td>
                  <Td textAlign='center'>{active == true ? 'Ativo' : 'Desativado'}</Td>
                  <Td textAlign='center'>
                  <Button colorScheme='red' variant='solid' size='sm' mr={2}> 
                      <FiEdit onClick={() => setOpened(true)} />
                  </Button>
                    {active == true ?
                      <Button colorScheme='red' variant='solid' size='sm'> 
                        <FiPause />
                      </Button>
                    :
                      <Button colorScheme='red' variant='solid' size='sm'> 
                        <FiPlay />
                      </Button>
                    }
                    <Button colorScheme='red' variant='solid' size='sm' ml={2}> 
                      <VscSettings onClick={() => router.push(`grupos/${id}`)} />
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
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create!"
      >
        <FormLabel>Nome</FormLabel>
        <Input 
          placeholder='nome' 
          value={name}
        />
        
            <Button colorScheme="green" mt={4} mr={4}>
              SALVAR
            </Button>
            <Button colorScheme="red" mt={4} >
              CANCELAR
            </Button>
      </Modal>
    </SidebarWithHeader>
    
  );
}

export default gruposDeLojas;