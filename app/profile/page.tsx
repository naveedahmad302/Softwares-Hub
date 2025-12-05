"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { isIndividualUser } from "@/lib/user-utils"

interface UserData {
  name: string
  email: string
  role: "user" | "company"
}

interface Company {
  id: number
  name: string
  logo: string
  city: string
  rating: number
  reviews: number
  services: string[]
  description: string
}

interface JobApplication {
  id: number
  jobId: number
  jobTitle: string
  company: string
  userId: string
  userName: string
  resume: string
  coverLetter: string
  appliedDate: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState<"profile" | "favorites" | "applications" | "settings">("profile")

  // Company data
  const allCompanies: Company[] = [
    {
      id: 1,
      name: "TechVision Labs",
      logo: "/tech-logo.jpg",
      city: "Islamabad",
      rating: 4.8,
      reviews: 24,
      services: ["Web Development", "Mobile Apps", "AI/ML"],
      description: "Leading software development company specializing in enterprise solutions.",
    },
    {
      id: 2,
      name: "Digital Forge",
      logo: "/digital-logo.jpg",
      city: "Rawalpindi",
      rating: 4.6,
      reviews: 18,
      services: ["UI/UX Design", "Web Development", "Consulting"],
      description: "Creative digital agency focused on innovative design and development.",
    },
    {
      id: 3,
      name: "CloudNine Systems",
      logo: "/cloud-logo.jpg",
      city: "Islamabad",
      rating: 4.9,
      reviews: 32,
      services: ["Cloud Solutions", "DevOps", "Infrastructure"],
      description: "Expert cloud infrastructure and DevOps solutions provider.",
    },
    {
      id: 4,
      name: "ByteForce Studios",
      logo: "/byte-logo.jpg",
      city: "Lahore",
      rating: 4.7,
      reviews: 28,
      services: ["Mobile Apps", "Game Development", "AR/VR"],
      description: "Innovative studio creating cutting-edge mobile and gaming experiences.",
    },
    {
      id: 5,
      name: "DataMind Analytics",
      logo: "/data-logo.jpg",
      city: "Islamabad",
      rating: 4.5,
      reviews: 15,
      services: ["Data Science", "AI/ML", "Business Intelligence"],
      description: "Specialized in data-driven solutions and machine learning implementations.",
    },
    {
      id: 6,
      name: "WebCraft Solutions",
      logo: "/web-logo.jpg",
      city: "Rawalpindi",
      rating: 4.4,
      reviews: 12,
      services: ["Web Development", "E-commerce", "CMS"],
      description: "Full-stack web development and e-commerce platform specialists.",
    },
    {
      id: 7,
      name: "SecureNet Technologies",
      logo: "/secure-logo.jpg",
      city: "Lahore",
      rating: 4.8,
      reviews: 22,
      services: ["Cybersecurity", "Infrastructure", "Consulting"],
      description: "Enterprise security solutions and infrastructure management.",
    },
    {
      id: 8,
      name: "InnovateLabs",
      logo: "/innovate-logo.jpg",
      city: "Islamabad",
      rating: 4.6,
      reviews: 19,
      services: ["Startup Consulting", "Product Development", "UI/UX Design"],
      description: "Helping startups build and scale their digital products.",
    },
  ]

  useEffect(() => {
    if (!isIndividualUser()) {
      router.push("/company-dashboard")
      return
    }

    // Load user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setEditData(userData)
    } else {
      router.push("/auth/login")
    }

    // Load favorites
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    const storedApplications = localStorage.getItem("job-applications")
    if (storedApplications) {
      const allApplications = JSON.parse(storedApplications)
      const userApplications = allApplications.filter((app: JobApplication) => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          return app.userId === userData.email
        }
        return false
      })
      setApplications(userApplications)
    }
  }, [router])

  const handleSaveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  const toggleFavorite = (companyId: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const handleSaveProfile = () => {
    if (editData) {
      setUser(editData)
      localStorage.setItem("user", JSON.stringify(editData))
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("favorites")
    router.push("/")
  }

  const favoriteCompanies = allCompanies.filter((c) => favorites.includes(c.id))

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border bg-background py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">My Profile</h1>
              <p className="text-lg text-foreground/60">Manage your account and preferences</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              🚪 Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "applications"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Job Applications
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "favorites"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Saved Companies
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2 bg-transparent"
                  >
                    ✏️ Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      value={editData?.name || ""}
                      onChange={(e) => setEditData({ ...editData!, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      value={editData?.email || ""}
                      onChange={(e) => setEditData({ ...editData!, email: e.target.value })}
                      placeholder="your@email.com"
                      type="email"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        if (editData) {
                          setUser(editData)
                          localStorage.setItem("user", JSON.stringify(editData))
                          setIsEditing(false)
                        }
                      }}
                      className="gap-2"
                    >
                      ✓ Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setEditData(user)
                      }}
                      className="gap-2 bg-transparent"
                    >
                      ✕ Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="text-sm text-foreground/60">Name</p>
                      <p className="font-medium text-foreground">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm text-foreground/60">Email</p>
                      <p className="font-medium text-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <p className="text-sm text-foreground/60">Account Type</p>
                      <p className="font-medium text-foreground capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">My Job Applications</h2>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">{app.jobTitle}</h3>
                        <p className="text-foreground/60">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : app.status === "reviewed"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
                      <div className="flex items-center gap-2">📅 Applied on {app.appliedDate}</div>
                      <div className="flex items-center gap-2">
                        ⏱️ {app.status === "pending" ? "Awaiting review" : `Status: ${app.status}`}
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Your Cover Letter:</p>
                      <p className="text-sm text-foreground/70 line-clamp-3">{app.coverLetter}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        💼 View Job
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        View Company
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <span className="text-5xl block mb-4">💼</span>
                <p className="text-lg text-foreground/60 mb-4">No applications yet</p>
                <p className="text-sm text-foreground/50 mb-6">
                  Start applying to jobs to track your applications here
                </p>
                <Link href="/jobs">
                  <Button>Browse Jobs</Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">Saved Companies</h1>
            <Card className="p-12 text-center">
              <span className="text-5xl block mb-4">❤️</span>
              <p className="text-lg text-foreground/60 mb-4">No saved companies yet</p>
              <p className="text-sm text-foreground/50 mb-6">Start exploring and save your favorite companies</p>
              <Link href="/companies">
                <Button>Browse Companies</Button>
              </Link>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground/70">Email notifications for new companies</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground/70">Weekly digest of featured companies</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-foreground/70">Job recommendations based on profile</span>
                </label>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Privacy</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                  <span className="text-foreground/70">Allow companies to contact me</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-foreground/70">Show my profile publicly</span>
                </label>
              </div>
            </Card>

            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Deleting your account is permanent and cannot be undone.
              </p>
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
                Delete Account
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
