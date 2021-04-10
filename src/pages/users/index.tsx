import { useState } from 'react'
import NextLink from 'next/link'
import { 
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, 
  Link,
  useBreakpointValue
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { useUsers } from '../../hooks/useUsers'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function UserList() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useUsers(page)

  const isScreenMedium = useBreakpointValue({ base: false, md: true })
  const isScreenSmall = useBreakpointValue({ base: true, sm: false })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`/users/${userId}`)
      return data
    }, { staleTime: 1000 * 60 * 10 })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <Sidebar />
        <Box w="100%" borderRadius="8px" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isFetching && !isLoading && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["1", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isScreenMedium && <Th>Data de cadastro</Th>}
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user: User) => (
                    <Tr key={user.id}>
                      <Td px={["1", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize={["smaller", "sm"]} color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isScreenMedium && <Td>{user.createdAt}</Td>}
                      {isScreenSmall ? 
                        (<Td></Td>) 
                        : (
                          <Td display={isScreenSmall && 'none'}>
                            <Button 
                              as="a" 
                              size="sm" 
                              fontSize="sm" 
                              colorScheme="whiteAlpha" 
                              leftIcon={isScreenSmall && <Icon as={RiPencilLine} />}
                            >
                              {isScreenMedium ? 'Editar' : <Icon as={RiPencilLine} />}
                            </Button>
                          </Td>
                        )
                      }
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination 
                totalQuantityOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}