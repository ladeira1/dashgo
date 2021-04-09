import Link from 'next/link'
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
  useBreakpointValue
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import { useUsers } from '../../hooks/useUsers'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers()

  const isScreenMedium = useBreakpointValue({ base: false, md: true })
  const isScreenSmall = useBreakpointValue({ base: true, sm: false })

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
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
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
                  {data.map((user: User) => (
                    <Tr>
                      <Td px={["1", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
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
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}