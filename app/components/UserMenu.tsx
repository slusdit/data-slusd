"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Shield,
  Moon,
  Sun,
  Monitor,
  Sparkles,
  ChevronDown,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";
import { SignOutGoogle } from "./GoogleSignOut";
import { SignInGoogle } from "./GoogleSignIn";
import Link from "next/link";
import { ROLE } from "@prisma/client";

interface UserMenuProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    admin?: boolean;
    roles?: ROLE[];
  } | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const { setTheme, theme } = useTheme();

  const handleSignOut = async () => {
    await SignOutGoogle();
    window.location.href = "/";
  };

  const handleSignIn = async () => {
    await SignInGoogle();
  };

  if (!user) {
    return (
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    );
  }

  const userInitials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const canAccessAdmin = user.admin || user.roles?.includes("SUPERADMIN" as ROLE) ||
    user.roles?.includes("SITEADMIN" as ROLE) || user.roles?.includes("PRINCIPAL" as ROLE);

  const canAccessAI = user.roles?.includes("AIQUERY" as ROLE) || user.roles?.includes("SUPERADMIN" as ROLE) || user.admin;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 gap-2 px-2 hover:bg-title-foreground/10"
        >
          <Avatar className="h-8 w-8 border border-title-foreground/20">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block text-title-foreground text-sm font-medium max-w-[120px] truncate">
            {user.name?.split(" ")[0]}
          </span>
          <ChevronDown className="h-4 w-4 text-title-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        {/* Profile Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Quick Actions */}
        <DropdownMenuGroup>
          {canAccessAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="gap-2 cursor-pointer">
                <Shield className="h-4 w-4" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}
          {canAccessAI && (
            <DropdownMenuItem asChild>
              <Link href="/ai-query" className="gap-2 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                AI Query
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        {(canAccessAdmin || canAccessAI) && <DropdownMenuSeparator />}

        {/* Theme Switcher */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Monitor className="h-4 w-4" />
            )}
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                <Sun className="h-4 w-4" />
                Light
                {theme === "light" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                <Moon className="h-4 w-4" />
                Dark
                {theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
                <Monitor className="h-4 w-4" />
                System
                {theme === "system" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
