import { 
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, 
  useBreakpointValue
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

export default function UserList() {
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
            </Heading>
            <Button 
              as="a" 
              size="sm" 
              fontSize="sm" 
              colorScheme="pink" 
              leftIcon={<Icon as={RiAddLine} />}
            >
              Criar novo
            </Button>
          </Flex>

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
              <Tr>
                <Td px={["1", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Joao Ladeira</Text>
                    <Text fontSize={["smaller", "sm"]} color="gray.300">joaoladeirag@gmail.com</Text>
                  </Box>
                </Td>
                {isScreenMedium && <Td>31 de Março de 2021</Td>}
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
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}