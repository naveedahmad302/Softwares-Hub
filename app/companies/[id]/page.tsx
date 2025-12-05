"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Star, Phone, Mail, Globe, ArrowLeft, Heart } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CompanyDetailPage() {
  const params = useParams()
  const companyId = Number.parseInt(params.id as string)
  const [isFavorite, setIsFavorite] = useState(false)

  // Company data (same as listings)
  const allCompanies = [
    {
      id: 1,
      name: "TechVision Labs",
      logo: "/tech-logo.jpg",
      city: "Islamabad",
      rating: 4.8,
      reviews: 24,
      services: ["Web Development", "Mobile Apps", "AI/ML"],
      description: "Leading software development company specializing in enterprise solutions.",
      fullDescription:
        "TechVision Labs is a premier software development company with over 10 years of experience in delivering cutting-edge solutions. We specialize in enterprise-level applications, mobile development, and AI/ML implementations. Our team of 50+ developers is committed to excellence and innovation.",
      website: "www.techvisionlabs.com",
      email: "contact@techvisionlabs.com",
      phone: "+92-51-1234567",
      address: "123 Tech Street, Islamabad, Pakistan",
      employees: "50-100",
      founded: "2014",
      portfolio: [
        { title: "E-commerce Platform", client: "Major Retail Chain", year: 2023 },
        { title: "AI Analytics Dashboard", client: "Financial Services", year: 2023 },
        { title: "Mobile Banking App", client: "Leading Bank", year: 2022 },
      ],
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
      fullDescription:
        "Digital Forge is a creative digital agency that transforms ideas into stunning digital experiences. With a focus on user-centered design and modern development practices, we help businesses stand out in the digital landscape.",
      website: "www.digitalforge.pk",
      email: "hello@digitalforge.pk",
      phone: "+92-51-9876543",
      address: "456 Design Avenue, Rawalpindi, Pakistan",
      employees: "20-50",
      founded: "2018",
      portfolio: [
        { title: "Brand Redesign", client: "Tech Startup", year: 2023 },
        { title: "Web Portal", client: "Government Agency", year: 2023 },
      ],
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
      fullDescription:
        "CloudNine Systems is a leading provider of cloud infrastructure and DevOps solutions. We help organizations migrate to the cloud, optimize their infrastructure, and implement best practices for continuous deployment.",
      website: "www.cloudnine.pk",
      email: "support@cloudnine.pk",
      phone: "+92-51-5555555",
      address: "789 Cloud Plaza, Islamabad, Pakistan",
      employees: "30-75",
      founded: "2016",
      portfolio: [
        { title: "Cloud Migration", client: "Enterprise Corp", year: 2023 },
        { title: "DevOps Pipeline", client: "SaaS Company", year: 2023 },
      ],
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
      fullDescription:
        "ByteForce Studios is an innovative development studio specializing in mobile applications, game development, and immersive AR/VR experiences. Our creative team pushes the boundaries of what's possible in digital entertainment.",
      website: "www.byteforce.pk",
      email: "info@byteforce.pk",
      phone: "+92-42-1111111",
      address: "321 Innovation Hub, Lahore, Pakistan",
      employees: "40-80",
      founded: "2017",
      portfolio: [
        { title: "Mobile Game", client: "Gaming Publisher", year: 2023 },
        { title: "AR Shopping App", client: "Retail Brand", year: 2023 },
      ],
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
      fullDescription:
        "DataMind Analytics transforms raw data into actionable insights. We specialize in machine learning, business intelligence, and data science solutions that drive business growth and informed decision-making.",
      website: "www.datamind.pk",
      email: "analytics@datamind.pk",
      phone: "+92-51-2222222",
      address: "555 Data Center, Islamabad, Pakistan",
      employees: "15-40",
      founded: "2019",
      portfolio: [
        { title: "Predictive Analytics", client: "Insurance Company", year: 2023 },
        { title: "BI Dashboard", client: "Manufacturing Firm", year: 2023 },
      ],
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
      fullDescription:
        "WebCraft Solutions delivers comprehensive web development services with a focus on e-commerce and content management systems. We build scalable, secure, and user-friendly web applications.",
      website: "www.webcraft.pk",
      email: "contact@webcraft.pk",
      phone: "+92-51-3333333",
      address: "222 Web Street, Rawalpindi, Pakistan",
      employees: "10-30",
      founded: "2015",
      portfolio: [
        { title: "E-commerce Store", client: "Fashion Brand", year: 2023 },
        { title: "CMS Platform", client: "Media Company", year: 2023 },
      ],
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
      fullDescription:
        "SecureNet Technologies is a trusted partner for enterprise security and infrastructure solutions. We provide comprehensive cybersecurity services, infrastructure management, and strategic consulting.",
      website: "www.securenet.pk",
      email: "security@securenet.pk",
      phone: "+92-42-4444444",
      address: "888 Security Lane, Lahore, Pakistan",
      employees: "35-70",
      founded: "2013",
      portfolio: [
        { title: "Security Audit", client: "Banking Sector", year: 2023 },
        { title: "Infrastructure Setup", client: "Tech Company", year: 2023 },
      ],
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
      fullDescription:
        "InnovateLabs is dedicated to helping startups and entrepreneurs bring their ideas to life. We provide end-to-end product development, design, and strategic consulting services.",
      website: "www.innovatelabs.pk",
      email: "hello@innovatelabs.pk",
      phone: "+92-51-6666666",
      address: "999 Startup Plaza, Islamabad, Pakistan",
      employees: "12-35",
      founded: "2020",
      portfolio: [
        { title: "Startup MVP", client: "EdTech Startup", year: 2023 },
        { title: "Product Redesign", client: "FinTech Startup", year: 2023 },
      ],
    },
  ]

  // Sample reviews
  const reviews = [
    {
      id: 1,
      author: "Ahmed Khan",
      rating: 5,
      date: "2 weeks ago",
      title: "Excellent work and professionalism",
      content:
        "TechVision Labs delivered our project on time and exceeded our expectations. Their team was professional, responsive, and delivered high-quality code.",
    },
    {
      id: 2,
      author: "Fatima Ali",
      rating: 4.5,
      date: "1 month ago",
      title: "Great communication and support",
      content:
        "Working with this team was a pleasure. They understood our requirements perfectly and provided excellent post-launch support.",
    },
    {
      id: 3,
      author: "Hassan Malik",
      rating: 5,
      date: "2 months ago",
      title: "Top-notch development team",
      content:
        "Highly recommend! They built our mobile app with cutting-edge technology and best practices. The app has been performing flawlessly.",
    },
    {
      id: 4,
      author: "Zainab Hussain",
      rating: 4,
      date: "3 months ago",
      title: "Professional and reliable",
      content:
        "Great experience working with them. They were transparent about timelines and delivered quality work. Would work with them again.",
    },
  ]

  const company = allCompanies.find((c) => c.id === companyId)

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Company Not Found</h1>
          <p className="text-foreground/60 mb-6">The company you're looking for doesn't exist.</p>
          <Link href="/companies">
            <Button>Back to Companies</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back Button */}
      <div className="border-b border-border bg-background/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/companies"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>
        </div>
      </div>

      {/* Company Header */}
      <section className="border-b border-border bg-background py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                className="h-20 w-20 rounded-lg bg-muted"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-foreground/60">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.city}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {company.rating} ({company.reviews} reviews)
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="lg"
              onClick={() => setIsFavorite(!isFavorite)}
              className="gap-2"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
              <p className="text-foreground/70 leading-relaxed mb-6">{company.fullDescription}</p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Founded</p>
                  <p className="font-semibold text-foreground">{company.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Team Size</p>
                  <p className="font-semibold text-foreground">{company.employees}</p>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Services</h2>
              <div className="flex flex-wrap gap-3">
                {company.services.map((service) => (
                  <span key={service} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </Card>

            {/* Portfolio */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Recent Projects</h2>
              <div className="space-y-4">
                {company.portfolio.map((project, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                    <p className="text-sm text-foreground/60 mb-2">{project.client}</p>
                    <p className="text-xs text-foreground/50">{project.year}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Client Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-sm text-foreground/60">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{review.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-foreground/70">{review.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Contact Card */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Address</p>
                      <p className="text-foreground">{company.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Phone</p>
                      <a href={`tel:${company.phone}`} className="text-primary hover:underline">
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Email</p>
                      <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Website</p>
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Placeholder */}
              <Card className="p-6 bg-muted/50">
                <h3 className="text-lg font-bold text-foreground mb-4">Location</h3>
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-foreground/60">{company.city}, Pakistan</p>
                  </div>
                </div>
              </Card>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Get in Touch
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
