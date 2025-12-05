"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const storedUser = localStorage.getItem("user")
    let userRole = "user"

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      userRole = userData.role || "user"
    }

    localStorage.setItem("user", JSON.stringify({ email, role: userRole }))

    // Redirect based on user type
    if (userRole === "company") {
      router.push("/company-dashboard")
    } else {
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-foreground/60">Sign in to your TechHub account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-destructive mt-2">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors({ ...errors, password: undefined })
                }}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-destructive mt-2">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border" disabled={isLoading} />
              <span className="text-sm text-foreground/70">Remember me</span>
            </label>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-foreground/50">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="outline" size="lg" className="w-full bg-transparent" disabled={isLoading}>
              Continue with Google
            </Button>
            <Button variant="outline" size="lg" className="w-full bg-transparent" disabled={isLoading}>
              Continue with GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
