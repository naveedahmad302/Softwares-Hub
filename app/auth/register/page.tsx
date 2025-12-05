"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"individual" | "company">("individual")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Store user session
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: userType === "company" ? "company" : "user",
      }),
    )
    router.push("/profile")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-foreground/60">Join TechHub and discover amazing companies</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setUserType("individual")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === "individual"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setUserType("company")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                userType === "company"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              }`}
            >
              Company
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.name && <p className="text-sm text-destructive mt-2">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-destructive mt-2">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-destructive mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-sm text-destructive mt-2">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border mt-1" disabled={isLoading} required />
              <span className="text-sm text-foreground/70">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
