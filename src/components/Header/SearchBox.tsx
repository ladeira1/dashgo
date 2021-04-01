import { Flex, Input, Icon } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function Searchbox() {
  const [search, setSearch] = useState('')

  function handleUpdateSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input 
        color="gray.50" 
        variant="unstyled" 
        placeholder="Buscar na plataforma" 
        _placeholder={{ color: 'gray.400' }} 
        px="4" 
        mr="4" 
        value={search}
        onChange={handleUpdateSearchValue}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}