"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  // Job listings data
  const allJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechVision Labs",
      city: "Islamabad",
      jobType: "Full-time",
      level: "Senior",
      salary: "150,000 - 200,000 PKR",
      description: "We're looking for an experienced full stack developer to lead our web development team.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Digital Forge",
      city: "Rawalpindi",
      jobType: "Full-time",
      level: "Mid-level",
      salary: "100,000 - 130,000 PKR",
      description: "Join our creative team to design beautiful and intuitive user interfaces.",
      skills: ["Figma", "UI Design", "Prototyping", "User Research"],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudNine Systems",
      city: "Islamabad",
      jobType: "Full-time",
      level: "Mid-level",
      salary: "120,000 - 160,000 PKR",
      description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Mobile App Developer (React Native)",
      company: "ByteForce Studios",
      city: "Lahore",
      jobType: "Full-time",
      level: "Mid-level",
      salary: "110,000 - 150,000 PKR",
      description: "Develop cross-platform mobile applications using React Native.",
      skills: ["React Native", "JavaScript", "Mobile Development", "Firebase"],
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      company: "DataMind Analytics",
      city: "Islamabad",
      jobType: "Full-time",
      level: "Senior",
      salary: "160,000 - 220,000 PKR",
      description: "Build and deploy machine learning models for data-driven solutions.",
      skills: ["Python", "TensorFlow", "Data Science", "ML Ops"],
      posted: "1 week ago",
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebCraft Solutions",
      city: "Rawalpindi",
      jobType: "Full-time",
      level: "Junior",
      salary: "60,000 - 90,000 PKR",
      description: "Build responsive and interactive web applications with modern frameworks.",
      skills: ["React", "CSS", "JavaScript", "HTML"],
      posted: "4 days ago",
    },
    {
      id: 7,
      title: "Security Consultant",
      company: "SecureNet Technologies",
      city: "Lahore",
      jobType: "Full-time",
      level: "Senior",
      salary: "170,000 - 250,000 PKR",
      description: "Provide security consulting and conduct penetration testing for enterprise clients.",
      skills: ["Cybersecurity", "Penetration Testing", "Risk Assessment", "Compliance"],
      posted: "1 week ago",
    },
    {
      id: 8,
      title: "Product Manager",
      company: "InnovateLabs",
      city: "Islamabad",
      jobType: "Full-time",
      level: "Mid-level",
      salary: "130,000 - 170,000 PKR",
      description: "Lead product strategy and development for our startup clients.",
      skills: ["Product Strategy", "Analytics", "Leadership", "Communication"],
      posted: "6 days ago",
    },
    {
      id: 9,
      title: "Backend Developer (Freelance)",
      company: "TechVision Labs",
      city: "Islamabad",
      jobType: "Freelance",
      level: "Mid-level",
      salary: "500 - 1000 USD/month",
      description: "Work on backend services and APIs for our enterprise clients.",
      skills: ["Node.js", "Python", "API Design", "Database Design"],
      posted: "2 days ago",
    },
    {
      id: 10,
      title: "QA Engineer",
      company: "Digital Forge",
      city: "Rawalpindi",
      jobType: "Full-time",
      level: "Junior",
      salary: "70,000 - 100,000 PKR",
      description: "Ensure quality of our web and mobile applications through comprehensive testing.",
      skills: ["Testing", "Automation", "QA", "Bug Tracking"],
      posted: "3 days ago",
    },
  ]

  const cities = Array.from(new Set(allJobs.map((j) => j.city)))
  const jobTypes = Array.from(new Set(allJobs.map((j) => j.jobType)))
  const levels = Array.from(new Set(allJobs.map((j) => j.level)))

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCity = !selectedCity || job.city === selectedCity
      const matchesJobType = !selectedJobType || job.jobType === selectedJobType
      const matchesLevel = !selectedLevel || job.level === selectedLevel

      return matchesSearch && matchesCity && matchesJobType && matchesLevel
    })
  }, [searchQuery, selectedCity, selectedJobType, selectedLevel])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border bg-background py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Job Opportunities</h1>
          <p className="text-lg text-foreground/60">Find your next role at top software houses in Pakistan</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <Input
                    placeholder="Job title, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">City</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCity(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCity === null ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground/70"
                    }`}
                  >
                    All Cities
                  </button>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCity === city
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Job Type</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedJobType(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedJobType === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground/70"
                    }`}
                  >
                    All Types
                  </button>
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedJobType(type)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedJobType === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Experience Level</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedLevel === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground/70"
                    }`}
                  >
                    All Levels
                  </button>
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedLevel === level
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCity || selectedJobType || selectedLevel) && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCity(null)
                    setSelectedJobType(null)
                    setSelectedLevel(null)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-foreground/60">
                Showing {filteredJobs.length} of {allJobs.length} jobs
              </p>
            </div>

            {/* Jobs */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                            {job.title}
                          </h3>
                          <p className="text-foreground/70 mb-3">{job.company}</p>

                          {/* Job Meta */}
                          <div className="flex flex-wrap gap-3 text-sm text-foreground/60 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.city}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.jobType}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {job.level}
                          </span>
                          <ArrowRight className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors mt-0.5" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/70 mb-4 line-clamp-2">{job.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 text-xs bg-muted text-foreground/70 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Posted */}
                      <p className="text-xs text-foreground/50 mt-4">Posted {job.posted}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-lg text-foreground/60 mb-4">No jobs found</p>
                <p className="text-sm text-foreground/50 mb-6">Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCity(null)
                    setSelectedJobType(null)
                    setSelectedLevel(null)
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
