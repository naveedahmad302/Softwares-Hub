import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Star, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function Home() {
  const featuredCompanies = [
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
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Discover Top Software Houses in Pakistan
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 mb-8 text-balance">
              Find, review, and connect with the best software development companies in Islamabad and Rawalpindi.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input placeholder="Search companies, technologies..." className="pl-10 h-12 text-base" />
              </div>
              <Button size="lg" className="h-12">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Companies</h2>
            <p className="text-lg text-foreground/60">Explore our top-rated software development partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                  <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="h-12 w-12 rounded-lg bg-muted"
                        />
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-foreground/60">
                            <MapPin className="h-4 w-4" />
                            {company.city}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/70 mb-4 flex-1">{company.description}</p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.services.slice(0, 2).map((service) => (
                        <span
                          key={service}
                          className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{company.rating}</span>
                        </div>
                        <span className="text-sm text-foreground/60">({company.reviews} reviews)</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/companies">
              <Button size="lg" variant="outline">
                View All Companies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">150+</div>
              <p className="text-lg text-foreground/70">Software Houses</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">5K+</div>
              <p className="text-lg text-foreground/70">Active Users</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-lg text-foreground/70">Reviews & Ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Are you a software house?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Claim your company profile, showcase your work, and connect with potential clients and talent.
            </p>
            <Button size="lg">Claim Your Company</Button>
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
