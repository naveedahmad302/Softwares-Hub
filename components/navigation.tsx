"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getCurrentUser } from "@/lib/user-utils"

interface User {
  name: string
  email: string
  role: "user" | "company"
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const navLinks = [
    { href: "/companies", label: "Companies" },
    { href: "/jobs", label: "Jobs" },
    { href: "/about", label: "About" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("company")
    localStorage.removeItem("favorites")
    window.location.href = "/"
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary"></div>
            <span className="text-xl font-bold text-foreground">TechHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href={user.role === "company" ? "/company-dashboard" : "/profile"}>
                  <Button variant="outline" size="sm">
                    {user.role === "company" ? "Dashboard" : "Profile"}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    {user ? (
                      <>
                        <Link href={user.role === "company" ? "/company-dashboard" : "/profile"} className="w-full">
                          <Button className="w-full">{user.role === "company" ? "Dashboard" : "Profile"}</Button>
                        </Link>
                        <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login" className="w-full">
                          <Button variant="outline" className="w-full bg-transparent">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth/register" className="w-full">
                          <Button className="w-full">Get Started</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
