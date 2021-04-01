import { ElementType } from "react";
import Link from 'next/link'
import { Link as ChakraLink, Icon, Text, LinkProps } from "@chakra-ui/react";

interface NavLinkProps extends LinkProps {
  icon: ElementType
  href: string
  children: string
}

export function NavLink({ icon, href, children, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </Link>
  )
}