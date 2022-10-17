import React from 'react'
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
import BoxComponent from '../../components/box/box';

const Login = () => {

  const router = useRouter()

  return (  
    <Flex
      minH={"100vh"}
      minW={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <BoxComponent>
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
              bg='#F56565' 
              color='#FFF' 
              size='md'
              onClick={() => router.push('/lojas')}
            >
              Acessar
            </Button>
          </Stack>
        </BoxComponent>
      </Stack>


      
    </Flex>
  );
}

export default Login;