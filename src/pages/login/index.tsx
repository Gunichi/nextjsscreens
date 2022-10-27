import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { 
  Box, 
  Flex, 
  Heading, 
  Stack, 
  Text, 
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const Login = () => {
          

  const router = useRouter()

  return (  
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Box 
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"md"}
        w={"sm"}
        p={8}      
      >
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Acessar sistema
          </Heading>
          <Text fontSize={"md"} color={"gray.600"}>
            Insira sua senha e seu e-mail.
          </Text>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button 
            colorScheme='red'
            onClick={() => router.push('/lojas')}
            justifyContent='flex-end'
          >
            Acessar
          </Button>
        </Stack>
      </Box>   
    </Flex>
  );
}

export default Login;