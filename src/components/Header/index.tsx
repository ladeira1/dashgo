import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../hooks/useSidebarDrawer'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { Searchbox } from './SearchBox'

export function Header() {
  const isScreenLarge = useBreakpointValue({ base: false, lg: true })
  const { onOpen } = useSidebarDrawer()

  return (
    <Flex 
      as="header" 
      w="100%" 
      maxW="1480px" 
      h="20" 
      mx="auto" 
      mt="4" 
      px="6" 
      align="center" 
    >
      { !isScreenLarge && (
        <IconButton 
          mr="2"
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
        ></IconButton>
      ) }
      <Logo />
      { isScreenLarge && <Searchbox /> }
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isScreenLarge} />
      </Flex>
    </Flex>
  )
}