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
  systemProps,
  Spinner,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { FiEdit, FiChevronLeft, FiChevronRight, FiPlusCircle } from 'react-icons/fi'
import SidebarWithHeader from '../../../components/sidebar/sidebar';
import Pagination from '@choc-ui/paginator';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

const GroupDetails = () => {

  interface data {
    result: {
    id: number,
    type: string,
    host: string,
    port: number,
    user: string,
    password: string,
    db: string,
    db2: string,
      systems: {
        system: string,
      }
    }
  }

  const [userData, setUserData] = useState<data[]>([]);

  const router = useRouter()
  const id = router.query.id

  const [data, setData] = useState([])
  const [system, setSystem] = useState<string[]>([])
  const [type , setType] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState(0)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [database, setDatabase] = useState('')
  const [database2, setDatabase2] = useState('')

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onCloseEditOpen } = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCloseCreateOpen } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios.get(`http://144.126.138.178/web/parameters/gunit/list/10`)
      .then(response => {
        setUserData(response.data.result)
        setData(response.data.result)
        setSystem(response.data.result.systems)
        setType(response.data.result.type)
        setHost(response.data.result.host)
        setPort(response.data.result.port)
        setUser(response.data.result.user)
        setPassword(response.data.result.password)
        setDatabase(response.data.result.db)
        setDatabase2(response.data.result.db2)
        setLoading(false)
      })
  }, [])

  console.log(userData)

  const handleEdit = ( 
    type : string,
    host : string,
    port : number,
    user : string,
    password : string,
    database : string,
    database2 : string,
    ) => {
    setType(type)
    setHost(host)
    setPort(port)
    setUser(user)
    setPassword(password)
    setDatabase(database)
    setDatabase2(database2)
    onEditOpen()
  }

  if (loading) {
    return (
      <Box justifyContent="center" alignItems="center" display="flex" height="100vh">
        <Spinner
          emptyColor='gray.200'
          color='red.500'
          size='xl'
        />
      </Box>
    )
  } else {
    return ( 
      <SidebarWithHeader>
        <Breadcrumb mt={20} separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/lojas'>Lojas</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/lojas/grupos'>Grupo de lojas</BreadcrumbLink>
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
                onClick={onCreateOpen}
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
                  <Th textAlign='center'>Tipo</Th>
                  <Th textAlign='center'>Sistema</Th>
                  <Th textAlign='center'>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr key={data.id}>
                  <Td textAlign='center'>{type}</Td>
                  <Td textAlign='center'>{system.system}</Td>
                  <Td textAlign='center'>
                    <Button 
                      colorScheme='red' 
                      variant='solid' 
                      size='sm' 
                      mr={2} 
                      onClick={() => handleEdit(
                        type,
                        host,
                        port,
                        user,
                        password,
                        database,
                        database2,
                      )}
                    > 
                      <FiEdit />
                    </Button>
                  </Td>
                </Tr> 
              </Tbody>
            </Table>                    
          </TableContainer>
        </Box>
        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isCreateOpen}
          onClose={onCloseCreateOpen}
          scrollBehavior='inside'
        >
          <ModalOverlay />
          <ModalContent maxH='70vh'>
            <ModalHeader>Adicionar grupo de loja</ModalHeader>
            <ModalCloseButton />
          <ModalBody pb={6}>

            <FormLabel>Tipo</FormLabel>
            <Input 
              placeholder='tipo' 
            />

            <FormLabel mt={2}>Host</FormLabel>
            <Input 
              placeholder='host' 
            />

            <FormLabel mt={2}>Porta</FormLabel>
            <Input 
              placeholder='porta' 
            />

            <FormLabel mt={2}>Usuário</FormLabel>
            <Input 
              placeholder='user' 
            />

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
              <Button onClick={onCloseCreateOpen}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isEditOpen}
          onClose={onCloseEditOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormLabel>Tipo</FormLabel>
              <Input 
                value={type}
                placeholder='tipo' 
              />

              <FormLabel mt={2}>Host</FormLabel>
              <Input 
                value={host}
                placeholder='host' 
              />

              <FormLabel mt={2}>Porta</FormLabel>
              <Input 
                value={port}
                placeholder='porta' 
              />

              <FormLabel mt={2}>Usuário</FormLabel>
              <Input 
                value={user}
                placeholder='user' 
              />

              <FormLabel mt={2}>Senha</FormLabel>
              <Input
                value={password}
                placeholder='senha' 
              />

              <FormLabel mt={2}>DB</FormLabel>
              <Input 
                value={database}
                placeholder='db' 
              />

              <FormLabel mt={2}>DB2</FormLabel>
              <Input 
                value={database2}
                placeholder='db2' 
              />

              <FormLabel mt={2}>Sistema</FormLabel>
                <Select placeholder='Select option'>
                  <option value={system}>{system.system}</option>
                </Select>
                
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
}

export default GroupDetails;