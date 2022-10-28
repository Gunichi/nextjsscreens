import { useState } from 'react';
import { 
  Box, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr 
} from '@chakra-ui/react';
import SidebarWithHeader from '../../components/sidebar/sidebar';

const Teste = () => {

  const date = new Date().getDate()
  const rowss = Array.from(Array(date).keys())

  return (
    <SidebarWithHeader>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Operadores </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box 
        bg='white'
        borderRadius='md'
        p='4'
        mt='4'
      >    
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Num. dias</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rowss.map((row) => (
                <Tr key={row}>
                  <Td>{row + 1}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </SidebarWithHeader>
  )
} 

export default Teste