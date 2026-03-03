"use client"

import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { primaryModules } from "@/config/navigation"
import { cn } from "@/lib/utils"

function getBasePath(url: string) {
  return url.split("?")[0]
}

function getQueryParam(url: string, key: string): string | null {
  const qIndex = url.indexOf("?")
  if (qIndex === -1) return null
  const params = new URLSearchParams(url.slice(qIndex))
  return params.get(key)
}

export function NavModules() {
  return (
    <Suspense>
      <NavModulesInner />
    </Suspense>
  )
}

function NavModulesInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="micro-label">Module</SidebarGroupLabel>
      <SidebarMenu>
        {primaryModules.map((item) => {
          const basePath = getBasePath(item.url)
          const pathMatches = pathname === basePath

          // For items sharing a base path (e.g. /assistant), disambiguate via query params
          const itemExpert = getQueryParam(item.url, "expert")
          const currentExpert = searchParams.get("expert")
          const isActive = pathMatches && (
            itemExpert
              ? currentExpert === itemExpert        // URL has ?expert= → must match exactly
              : !currentExpert                       // URL has no ?expert= → active only when no param set
          )

          // Collapsed: Compact icon button with tooltip
          if (isCollapsed) {
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon className="size-4 text-primary" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // Compact variant: Single-line with icon + title
          if (item.variant === "compact") {
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon className="size-4 text-primary" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // Expanded: Card layout with icon, title, description
          return (
            <SidebarMenuItem key={item.url}>
              <Link
                href={item.url}
                className={cn(
                  "flex flex-col gap-1.5 border p-3 transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm",
                  isActive
                    ? "border-primary/40 bg-sidebar-accent shadow-sm"
                    : "border-sidebar-border hover:border-sidebar-accent-foreground/20"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-8 items-center justify-center bg-sidebar-accent">
                    <item.icon className="size-4 text-primary" />
                  </span>
                  {item.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      <span className="inline-block size-1 rounded-full bg-primary" />
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span
                    className={cn(
                      "text-sm font-bold leading-tight tracking-tight",
                      isActive && "text-foreground"
                    )}
                  >
                    {item.title}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
