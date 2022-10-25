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
      <Stack spacing={8} mx={"auto"} maxW={"md"} py={12} px={6}>
        <Box 
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"sm"}
        w={"sm"}
        p={8}      
        height={[
          "100%", // base
          "50%", // 480px upwards
          "25%", // 768px upwards
          "15%", // 992px upwards
        ]}
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
              bg='#F56565' 
              color='#FFF' 
              size='md'
              onClick={() => router.push('/lojas')}
            >
              Acessar
            </Button>
          </Stack>
        </Box>
      </Stack>


      
    </Flex>
  );
}

export default Login;