"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { assistantNavItem } from "@/config/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavAssistant() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const isActive = pathname.startsWith(assistantNavItem.url)

  if (isCollapsed) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={assistantNavItem.title}>
              <Link href={assistantNavItem.url}>
                <assistantNavItem.icon className="size-4 text-primary" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link
            href={assistantNavItem.url}
            className={cn(
              "flex items-center gap-3 border p-3 transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm",
              isActive
                ? "border-primary/40 bg-sidebar-accent shadow-sm"
                : "border-sidebar-border hover:border-sidebar-accent-foreground/20"
            )}
          >
            <span className="flex size-8 shrink-0 items-center justify-center bg-primary/10">
              <assistantNavItem.icon className="size-4 text-primary" />
            </span>
            <div className="min-w-0">
              <span className={cn(
                "text-sm font-bold leading-tight tracking-tight",
                isActive && "text-foreground"
              )}>
                {assistantNavItem.title}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {assistantNavItem.description}
              </p>
            </div>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
