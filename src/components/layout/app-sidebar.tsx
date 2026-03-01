import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SidebarLogo } from "./sidebar-logo"
import { AppSwitcher } from "./app-switcher"
import { NavModules } from "./nav-modules"

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
        <SidebarMenu>
          <SidebarMenuItem>
            <AppSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavModules />
      </SidebarContent>
    </Sidebar>
  )
}
