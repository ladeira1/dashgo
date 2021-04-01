import { Flex, Stack, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/input'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState, errors } = useForm({ resolver: yupResolver(signInFormSchema) })

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex 
        as="form" 
        flexDir="column" 
        w="100%" 
        maxW="360" 
        bg="gray.800" 
        p="8" 
        borderRadius="8"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            name="email" 
            type="email" 
            label="E-mail" 
            ref={register()} 
            error={errors.email}
          />
          <Input 
            name="password" 
            type="password" 
            label="Senha" 
            ref={register()} 
            error={errors.password}
          />
        </Stack>
        <Button type="submit" mt="6" h="45px" colorScheme="pink" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
