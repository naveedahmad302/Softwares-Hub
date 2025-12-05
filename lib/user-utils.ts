export interface User {
  name: string
  email: string
  role: "user" | "company"
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const storedUser = localStorage.getItem("user")
  return storedUser ? JSON.parse(storedUser) : null
}

export function isCompanyUser(): boolean {
  const user = getCurrentUser()
  return user?.role === "company"
}

export function isIndividualUser(): boolean {
  const user = getCurrentUser()
  return user?.role === "user"
}

export function getRedirectPath(): string {
  const user = getCurrentUser()
  if (!user) return "/auth/login"
  return user.role === "company" ? "/company-dashboard" : "/profile"
}
