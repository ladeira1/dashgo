import { 
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps 
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      { !!label && <FormLabel htmlFor="email">E-mail</FormLabel> }
      <ChakraInput 
        name="email" 
        type="email" 
        focusBorderColor="pink.500" 
        bg="gray.900" 
        variant="filled" 
        _hover={{ bgColor: 'gray.900' }} 
        size="lg"  
        {...rest}
      />
    </FormControl>
  )
}