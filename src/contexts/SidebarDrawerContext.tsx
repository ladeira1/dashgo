import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode
}

interface SibebarDrawerContextData {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const SidebarDrawerContext = createContext({} as SibebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => onClose(), [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={{
      isOpen,
      onOpen,
      onClose,
    }}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}