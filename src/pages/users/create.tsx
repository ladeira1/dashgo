import Link from 'next/link'
import { 
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { Input } from '../../components/Form/input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', { user: { ...user, created_at: new Date() } })
    return response.data.user
  }, { onSuccess: () => {
    queryClient.invalidateQueries('users')
  } })

  const { register, handleSubmit, formState, errors } = useForm({ resolver: yupResolver(createUserFormSchema) })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)
    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <Sidebar />
        <Box 
          as="form" 
          flex="1" 
          borderRadius="8px" 
          bg="gray.800"
          p={["6", "8"]} 
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Cadastrar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="name" 
                label="Nome completo" 
                ref={register} 
                error={errors.name}
              />
              <Input 
                name="email" 
                type="email" 
                label="E-mail" 
                ref={register} 
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input 
                name="password" 
                type="password" 
                label="Senha" 
                ref={register} 
                error={errors.password}
              />
              <Input 
                name="passwordConfirmation" 
                type="password" 
                label="Confirme sua senha" ref={register} 
                error={errors.passwordConfirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}