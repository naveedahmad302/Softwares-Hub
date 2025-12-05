"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, Building2, MapPin, Phone, Globe, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CompanyRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    phone: "",
    website: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
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
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.city) {
      newErrors.city = "City is required"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
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

    const companyData = {
      id: Date.now(),
      name: formData.companyName,
      email: formData.email,
      city: formData.city,
      phone: formData.phone,
      website: formData.website,
      description: formData.description,
      verified: false,
      verificationStatus: "pending",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("company", JSON.stringify(companyData))
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.companyName,
        email: formData.email,
        role: "company",
        companyId: companyData.id,
      }),
    )

    router.push("/company-dashboard")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Register Your Company</h1>
            <p className="text-foreground/60">Join TechHub and start posting job openings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Your Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.companyName && <p className="text-sm text-destructive mt-2">{errors.companyName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Business Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="company@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive mt-2">{errors.email}</p>}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                    if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }))
                  }}
                  className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  disabled={isLoading}
                >
                  <option value="">Select a city</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                </select>
              </div>
              {errors.city && <p className="text-sm text-destructive mt-2">{errors.city}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive mt-2">{errors.phone}</p>}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                Website (Optional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourcompany.com"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Company Description
              </label>
              <textarea
                id="description"
                placeholder="Tell us about your company, services, and expertise..."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={4}
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.password && <p className="text-sm text-destructive mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
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
            <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Company"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Already registered?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
