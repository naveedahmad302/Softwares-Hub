"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { isCompanyUser } from "@/lib/user-utils"

interface JobPosting {
  id: number
  title: string
  description: string
  location: string
  jobType: string
  salary: string
  postedDate: string
  applications: number
}

interface CompanyData {
  id: number
  name: string
  email: string
  city: string
  phone: string
  website: string
  description: string
  verified: boolean
  verificationStatus: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function CompanyDashboardPage() {
  const router = useRouter()
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applications" | "profile">("overview")
  const [showJobForm, setShowJobForm] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salary: "",
  })

  useEffect(() => {
    if (!isCompanyUser()) {
      router.push("/profile")
    }

    const storedCompany = localStorage.getItem("company")
    if (storedCompany) {
      setCompany(JSON.parse(storedCompany))
    } else {
      router.push("/company-register")
    }

    const storedJobs = localStorage.getItem("company-jobs")
    if (storedJobs) {
      setJobPostings(JSON.parse(storedJobs))
    }
  }, [router])

  const handlePostJob = () => {
    if (!newJob.title || !newJob.description || !newJob.location || !newJob.salary) {
      alert("Please fill in all fields")
      return
    }

    const job: JobPosting = {
      id: Date.now(),
      title: newJob.title,
      description: newJob.description,
      location: newJob.location,
      jobType: newJob.jobType,
      salary: newJob.salary,
      postedDate: new Date().toLocaleDateString(),
      applications: 0,
    }

    const updated = [...jobPostings, job]
    setJobPostings(updated)
    localStorage.setItem("company-jobs", JSON.stringify(updated))
    setNewJob({ title: "", description: "", location: "", jobType: "Full-time", salary: "" })
    setShowJobForm(false)
  }

  const handleDeleteJob = (id: number) => {
    const updated = jobPostings.filter((job) => job.id !== id)
    setJobPostings(updated)
    localStorage.setItem("company-jobs", JSON.stringify(updated))
  }

  const handleLogout = () => {
    localStorage.removeItem("company")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{company.name}</h1>
              <p className="text-foreground/60">Company Dashboard</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              🚪 Logout
            </Button>
          </div>
        </div>
      </section>

      {company.verificationStatus === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 rounded-lg p-4 flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⏳</span>
          <div>
            <h3 className="font-semibold text-yellow-900">Verification Pending</h3>
            <p className="text-sm text-yellow-800">
              Your company is under review. You can post jobs once verified by our admin team.
            </p>
          </div>
        </div>
      )}

      {company.verificationStatus === "approved" && (
        <div className="bg-green-50 border border-green-200 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 rounded-lg p-4 flex items-start gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div>
            <h3 className="font-semibold text-green-900">Company Verified</h3>
            <p className="text-sm text-green-800">Your company is verified. You can now post job openings.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "jobs"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "applications"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Applications
          </button>
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
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Active Jobs</p>
                  <p className="text-3xl font-bold text-foreground">{jobPostings.length}</p>
                </div>
                <span className="text-4xl opacity-20">💼</span>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-foreground">
                    {jobPostings.reduce((sum, job) => sum + job.applications, 0)}
                  </p>
                </div>
                <span className="text-4xl opacity-20">👥</span>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Verification Status</p>
                  <p className="text-lg font-bold text-foreground capitalize">{company.verificationStatus}</p>
                </div>
                <span className="text-4xl">{company.verificationStatus === "approved" ? "✓" : "⏳"}</span>
              </div>
            </Card>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Job Postings</h2>
              {company.verificationStatus === "approved" && (
                <Button onClick={() => setShowJobForm(!showJobForm)} className="gap-2">
                  ➕ Post New Job
                </Button>
              )}
            </div>

            {/* Job Form */}
            {showJobForm && company.verificationStatus === "approved" && (
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Create Job Posting</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                    <Input
                      placeholder="e.g., Senior React Developer"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      placeholder="Job description, responsibilities, requirements..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <Input
                        placeholder="e.g., Islamabad"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Job Type</label>
                      <select
                        value={newJob.jobType}
                        onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Remote</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Salary Range</label>
                    <Input
                      placeholder="e.g., 50,000 - 80,000 PKR"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handlePostJob}>Post Job</Button>
                    <Button variant="outline" onClick={() => setShowJobForm(false)} className="bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Job Listings */}
            {jobPostings.length > 0 ? (
              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <Card key={job.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                        <p className="text-sm text-foreground/60">Posted on {job.postedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          👁️ View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                          className="gap-2 bg-transparent text-destructive hover:bg-destructive/10"
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-4">{job.description.substring(0, 150)}...</p>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                      <span>{job.location}</span>
                      <span>{job.jobType}</span>
                      <span>{job.salary}</span>
                      <span className="text-primary font-medium">{job.applications} applications</span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <span className="text-5xl block mb-4">💼</span>
                <p className="text-lg text-foreground/60 mb-4">No job postings yet</p>
                {company.verificationStatus === "approved" ? (
                  <Button onClick={() => setShowJobForm(true)}>Post Your First Job</Button>
                ) : (
                  <p className="text-sm text-foreground/50">Your company needs to be verified before posting jobs.</p>
                )}
              </Card>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Job Applications</h2>
            <Card className="p-12 text-center">
              <span className="text-5xl block mb-4">👥</span>
              <p className="text-lg text-foreground/60">No applications yet</p>
              <p className="text-sm text-foreground/50 mt-2">
                Applications will appear here once users apply to your jobs
              </p>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Company Profile</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60">Company Name</p>
                  <p className="font-medium text-foreground">{company.name}</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60">Email</p>
                  <p className="font-medium text-foreground">{company.email}</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60">City</p>
                  <p className="font-medium text-foreground">{company.city}</p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60">Phone</p>
                  <p className="font-medium text-foreground">{company.phone}</p>
                </div>
                {company.website && (
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-foreground/60">Website</p>
                    <p className="font-medium text-foreground">{company.website}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-foreground/60">Description</p>
                  <p className="font-medium text-foreground">{company.description}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
