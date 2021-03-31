import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
 
export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Joao Ladeira</Text>
        <Text color="gray.300" fontSize="small">
          joaoladeirag@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Joao Ladeira" src="https://github.com/ladeira1.png" />
    </Flex>
  )
}