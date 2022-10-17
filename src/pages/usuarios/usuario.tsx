import { 
  Box, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
  Text,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import { ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react'

import { FiPlay, FiEdit } from 'react-icons/fi'

import SimpleSidebar from '../../components/sidebar/sidebar'

import { data } from '../../utils/data';

export default function Usuario() {
  
  const user = data

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(user.slice(0, 10));

  useEffect(() => {
    const from = (page - 1) * 10;
    const to = from + 10;
    setRecords(user.slice(from, to));
  }, [page]);

  return ( 
    <SimpleSidebar>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Permissões</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box 
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"sm"}
        w={'100%'}
        p={8}
        mt={4}
      >
        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={2} h='10'>
            <Text fontSize='2xl'>Permissões</Text>  
          </GridItem>
          <GridItem colStart={6} colEnd={6} h='10'>
          </GridItem>
        </Grid>
        <DataTable
          records={records}
          columns={[
            { accessor: 'name', width: '100%' },
            { accessor: 'importar', 
              width: '100%',
              render: () => (
                <Group spacing={4} position="right" noWrap>
                  <Checkbox />
                </Group>
            )},
            { accessor: 'Exportar', 
            width: '100%',
            render: () => (
              <Group spacing={4} position="right" noWrap>
                <Checkbox />
              </Group>
            )},
            { accessor: 'Cadastrar', 
              width: '100%',
              render: () => (
                <Group spacing={4} position="right" noWrap>
                  <Checkbox />
                </Group>
              )}
          ]}
          totalRecords={user.length}
          recordsPerPage={10}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </Box>
    </SimpleSidebar>
  )
}
