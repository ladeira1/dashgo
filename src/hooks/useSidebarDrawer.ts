import { useContext } from "react";
import { SidebarDrawerContext } from '../contexts/SidebarDrawerContext'

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)