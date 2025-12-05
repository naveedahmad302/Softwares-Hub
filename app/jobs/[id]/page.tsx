"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Briefcase, DollarSign, ArrowLeft, Send, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

interface JobDetail {
  id: number
  title: string
  company: string
  city: string
  jobType: string
  level: string
  salary: string
  description: string
  skills: string[]
  posted: string
  fullDescription: string
  responsibilities: string[]
  requirements: string[]
}

interface UserData {
  name: string
  email: string
  role: "user" | "company"
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<JobDetail | null>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [hasApplied, setHasApplied] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationData, setApplicationData] = useState({
    resume: "",
    coverLetter: "",
  })

  const allJobs: JobDetail[] = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechVision Labs",
      city: "Islamabad",
      jobType: "Full-time",
      level: "Senior",
      salary: "150,000 - 200,000 PKR",
      description: "We're looking for an experienced full stack developer to lead our web development team.",
      fullDescription:
        "Join TechVision Labs as a Senior Full Stack Developer and lead our web development initiatives. You'll work with cutting-edge technologies and mentor junior developers while building scalable solutions for enterprise clients.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      responsibilities: [
        "Lead development of full-stack web applications",
        "Mentor junior developers and conduct code reviews",
        "Design and implement scalable backend systems",
        "Collaborate with product and design teams",
      ],
      requirements: [
        "5+ years of full-stack development experience",
        "Expert knowledge of React and Node.js",
        "Strong understanding of database design",
        "Experience with cloud platforms (AWS/GCP)",
      ],
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
      fullDescription:
        "Digital Forge is looking for a talented UI/UX Designer to create exceptional user experiences for our diverse client base. You'll work on web and mobile applications, collaborating closely with developers and product managers.",
      skills: ["Figma", "UI Design", "Prototyping", "User Research"],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with developers on implementation",
      ],
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma or similar tools",
        "Strong portfolio demonstrating design skills",
        "Understanding of user-centered design principles",
      ],
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
      fullDescription:
        "CloudNine Systems seeks a DevOps Engineer to manage and optimize our cloud infrastructure. You'll work with modern DevOps tools and practices to ensure reliable, scalable systems.",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      responsibilities: [
        "Manage cloud infrastructure and deployment pipelines",
        "Implement CI/CD solutions",
        "Monitor system performance and optimize resources",
        "Implement security best practices",
      ],
      requirements: [
        "3+ years of DevOps experience",
        "Strong knowledge of Docker and Kubernetes",
        "Experience with AWS or similar cloud platforms",
        "Proficiency in scripting languages",
      ],
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
      fullDescription:
        "ByteForce Studios is hiring a React Native Developer to build high-quality mobile applications for iOS and Android platforms.",
      skills: ["React Native", "JavaScript", "Mobile Development", "Firebase"],
      responsibilities: [
        "Develop cross-platform mobile applications",
        "Implement responsive UI designs",
        "Integrate with backend APIs",
        "Optimize app performance",
      ],
      requirements: [
        "3+ years of mobile development experience",
        "Strong React Native skills",
        "Experience with Firebase or similar backends",
        "Understanding of iOS and Android platforms",
      ],
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
      fullDescription:
        "DataMind Analytics is looking for a Machine Learning Engineer to develop and deploy ML models that drive business insights.",
      skills: ["Python", "TensorFlow", "Data Science", "ML Ops"],
      responsibilities: [
        "Develop and train machine learning models",
        "Deploy models to production",
        "Analyze large datasets",
        "Collaborate with data scientists",
      ],
      requirements: [
        "4+ years of ML engineering experience",
        "Expert Python and TensorFlow skills",
        "Experience with ML deployment",
        "Strong statistics and mathematics background",
      ],
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
      fullDescription:
        "WebCraft Solutions is seeking a Junior Frontend Developer to join our growing team and build beautiful web applications.",
      skills: ["React", "CSS", "JavaScript", "HTML"],
      responsibilities: [
        "Develop responsive web interfaces",
        "Implement UI designs",
        "Optimize web performance",
        "Write clean, maintainable code",
      ],
      requirements: [
        "1-2 years of frontend development experience",
        "Strong HTML, CSS, and JavaScript skills",
        "Experience with React",
        "Understanding of responsive design",
      ],
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
      fullDescription:
        "SecureNet Technologies is hiring a Security Consultant to help clients secure their systems and data.",
      skills: ["Cybersecurity", "Penetration Testing", "Risk Assessment", "Compliance"],
      responsibilities: [
        "Conduct security assessments",
        "Perform penetration testing",
        "Develop security strategies",
        "Provide security consulting",
      ],
      requirements: [
        "5+ years of cybersecurity experience",
        "Relevant security certifications",
        "Experience with penetration testing",
        "Strong knowledge of compliance standards",
      ],
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
      fullDescription:
        "InnovateLabs seeks a Product Manager to drive product strategy and development for innovative startup solutions.",
      skills: ["Product Strategy", "Analytics", "Leadership", "Communication"],
      responsibilities: [
        "Define product vision and strategy",
        "Manage product roadmap",
        "Analyze user data and metrics",
        "Lead cross-functional teams",
      ],
      requirements: [
        "3+ years of product management experience",
        "Strong analytical skills",
        "Experience with product analytics tools",
        "Excellent communication skills",
      ],
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
      fullDescription:
        "TechVision Labs is looking for a freelance Backend Developer to work on various backend projects.",
      skills: ["Node.js", "Python", "API Design", "Database Design"],
      responsibilities: [
        "Develop backend services and APIs",
        "Design database schemas",
        "Optimize database queries",
        "Implement security measures",
      ],
      requirements: [
        "3+ years of backend development experience",
        "Strong Node.js or Python skills",
        "Experience with API design",
        "Knowledge of database design",
      ],
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
      fullDescription:
        "Digital Forge is hiring a QA Engineer to ensure the quality of our web and mobile applications.",
      skills: ["Testing", "Automation", "QA", "Bug Tracking"],
      responsibilities: [
        "Create and execute test cases",
        "Automate testing processes",
        "Report and track bugs",
        "Collaborate with developers",
      ],
      requirements: [
        "1-2 years of QA experience",
        "Knowledge of testing methodologies",
        "Experience with automation tools",
        "Attention to detail",
      ],
      posted: "3 days ago",
    },
  ]

  useEffect(() => {
    const jobId = Number.parseInt(params.id)
    const foundJob = allJobs.find((j) => j.id === jobId)
    setJob(foundJob || null)

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const applications = localStorage.getItem("job-applications")
    if (applications) {
      const appList = JSON.parse(applications)
      if (appList.some((app: any) => app.jobId === jobId)) {
        setHasApplied(true)
      }
    }
  }, [params.id])

  const handleApplyJob = () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (user.role === "company") {
      alert("Companies cannot apply for jobs")
      return
    }

    if (!applicationData.resume || !applicationData.coverLetter) {
      alert("Please fill in all fields")
      return
    }

    const applications = localStorage.getItem("job-applications") || "[]"
    const appList = JSON.parse(applications)

    const newApplication = {
      id: Date.now(),
      jobId: job?.id,
      jobTitle: job?.title,
      company: job?.company,
      userId: user.email,
      userName: user.name,
      resume: applicationData.resume,
      coverLetter: applicationData.coverLetter,
      appliedDate: new Date().toLocaleDateString(),
      status: "pending",
    }

    appList.push(newApplication)
    localStorage.setItem("job-applications", JSON.stringify(appList))

    setHasApplied(true)
    setShowApplicationForm(false)
    setApplicationData({ resume: "", coverLetter: "" })
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Job not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{job.title}</h1>
          <p className="text-lg text-foreground/60">{job.company}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4">
                <p className="text-xs text-foreground/60 mb-1">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-foreground">{job.city}</p>
                </div>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-foreground/60 mb-1">Type</p>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-foreground">{job.jobType}</p>
                </div>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-foreground/60 mb-1">Level</p>
                <p className="font-semibold text-foreground">{job.level}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-foreground/60 mb-1">Salary</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-foreground text-sm">{job.salary}</p>
                </div>
              </Card>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Role</h2>
              <p className="text-foreground/70 mb-6">{job.fullDescription}</p>

              <h3 className="text-xl font-bold text-foreground mb-3">Responsibilities</h3>
              <ul className="space-y-2 mb-6">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground/70">
                    <span className="text-primary font-bold">•</span>
                    {resp}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-foreground mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground/70">
                    <span className="text-primary font-bold">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {hasApplied ? (
                <Card className="p-6 bg-green-50 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-green-900">Application Sent</h3>
                  </div>
                  <p className="text-sm text-green-800">
                    Your application has been submitted. The company will review it soon.
                  </p>
                </Card>
              ) : (
                <>
                  {!showApplicationForm ? (
                    <Button
                      size="lg"
                      className="w-full gap-2"
                      onClick={() => {
                        if (!user) {
                          router.push("/auth/login")
                        } else if (user.role === "company") {
                          alert("Companies cannot apply for jobs")
                        } else {
                          setShowApplicationForm(true)
                        }
                      }}
                    >
                      <Send className="h-4 w-4" />
                      Apply Now
                    </Button>
                  ) : (
                    <Card className="p-6">
                      <h3 className="font-bold text-foreground mb-4">Apply for this job</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Resume/CV</label>
                          <textarea
                            placeholder="Paste your resume or CV here..."
                            value={applicationData.resume}
                            onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Cover Letter</label>
                          <textarea
                            placeholder="Tell us why you're interested in this role..."
                            value={applicationData.coverLetter}
                            onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleApplyJob} className="flex-1">
                            Submit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowApplicationForm(false)}
                            className="flex-1 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}

              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-3">About {job.company}</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  {job.company} is a leading software development company in {job.city}.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Company Profile
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <p className="text-xs text-foreground/60 mb-2">Posted {job.posted}</p>
                <p className="text-xs text-foreground/50">Job ID: {job.id}</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
