import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Target, Zap, Globe, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're committed to connecting talent with opportunity and helping businesses find the right partners.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a thriving community of developers, designers, and entrepreneurs in Pakistan.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly improving our platform to serve the tech community better.",
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Bringing world-class software development practices to the Pakistani tech ecosystem.",
    },
  ]

  const team = [
    {
      name: "Ahmed Khan",
      role: "Founder & CEO",
      bio: "Tech entrepreneur with 15+ years of experience in software development.",
    },
    {
      name: "Fatima Ali",
      role: "Co-Founder & CTO",
      bio: "Full-stack developer passionate about building scalable platforms.",
    },
    {
      name: "Hassan Malik",
      role: "Head of Operations",
      bio: "Operations expert focused on community growth and engagement.",
    },
    {
      name: "Zainab Hussain",
      role: "Head of Marketing",
      bio: "Marketing strategist dedicated to connecting businesses with talent.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              About TechHub
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 text-balance">
              Connecting Pakistan's tech talent with world-class software development companies. We're building the
              future of tech in South Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                TechHub is on a mission to revolutionize how software companies and talent connect in Pakistan. We
                believe that great technology comes from great people working together.
              </p>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                By providing a transparent, community-driven platform, we're helping businesses find the right partners
                and enabling professionals to discover opportunities that match their skills and aspirations.
              </p>
              <Button size="lg">Join Our Community</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <p className="text-foreground/70">Software Houses</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <p className="text-foreground/70">Active Users</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-foreground/70">Reviews</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <p className="text-foreground/70">Years Old</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary/5 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              These core values guide everything we do at TechHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Passionate individuals dedicated to building the best tech platform in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-foreground/70">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Our Story</h2>

            <div className="space-y-6 text-foreground/70 leading-relaxed">
              <p>
                TechHub was founded in 2023 by a group of tech entrepreneurs who saw a gap in Pakistan's tech ecosystem.
                While the country has incredible talent and innovative companies, there was no centralized platform to
                connect them effectively.
              </p>

              <p>
                We started with a simple idea: create a transparent, community-driven marketplace where software houses
                can showcase their work, and professionals can discover opportunities that match their skills and
                aspirations.
              </p>

              <p>
                Today, TechHub has grown to become the go-to platform for discovering top software development companies
                in Islamabad, Rawalpindi, Lahore, and beyond. We've helped hundreds of companies find the right talent
                and thousands of professionals find their dream roles.
              </p>

              <p>
                But we're just getting started. Our vision is to become the leading tech platform in South Asia,
                connecting talent with opportunity and helping businesses build world-class products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Join Us?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Whether you're a software house looking to showcase your work or a professional seeking your next
              opportunity, TechHub is the place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/companies">
                <Button size="lg" className="gap-2">
                  Explore Companies
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Browse Jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-lg bg-primary"></div>
                <span className="font-bold text-foreground">TechHub</span>
              </div>
              <p className="text-sm text-foreground/60">Connecting talent with top software houses in Pakistan.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <Link href="/companies" className="hover:text-foreground transition-colors">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-foreground transition-colors">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2025 TechHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
