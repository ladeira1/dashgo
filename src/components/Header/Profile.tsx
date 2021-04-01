import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
 
interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center" pr={["2", "1"]}>
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Joao Ladeira</Text>
          <Text color="gray.300" fontSize="small">
            joaoladeirag@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size={"md"} name="Joao Ladeira" src="https://github.com/ladeira1.png" />
    </Flex>
  )
}