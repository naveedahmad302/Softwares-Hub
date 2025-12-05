"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Star, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)

  // Extended company data
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

  const cities = Array.from(new Set(allCompanies.map((c) => c.city)))
  const allServices = Array.from(new Set(allCompanies.flatMap((c) => c.services)))

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCity = !selectedCity || company.city === selectedCity
      const matchesServices =
        selectedServices.length === 0 || selectedServices.some((service) => company.services.includes(service))
      const matchesRating = company.rating >= minRating

      return matchesSearch && matchesCity && matchesServices && matchesRating
    })
  }, [searchQuery, selectedCity, selectedServices, minRating])

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="border-b border-border bg-background py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Explore Companies</h1>
          <p className="text-lg text-foreground/60">Find the perfect software development partner for your project</p>
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
                    placeholder="Company name, service..."
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

              {/* Services Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Services</h3>
                <div className="space-y-2">
                  {allServices.map((service) => (
                    <label key={service} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground/70">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        minRating === rating
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground/70"
                      }`}
                    >
                      {rating === 0 ? "All Ratings" : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCity || selectedServices.length > 0 || minRating > 0) && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCity(null)
                    setSelectedServices([])
                    setMinRating(0)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Companies Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-foreground/60">
                Showing {filteredCompanies.length} of {allCompanies.length} companies
              </p>
            </div>

            {/* Companies */}
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCompanies.map((company) => (
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
                        <p className="text-sm text-foreground/70 mb-4 flex-1 line-clamp-2">{company.description}</p>

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
                          {company.services.length > 2 && (
                            <span className="inline-block px-2 py-1 text-xs font-medium text-foreground/60">
                              +{company.services.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-foreground">{company.rating}</span>
                            </div>
                            <span className="text-sm text-foreground/60">({company.reviews})</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-foreground/40 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-lg text-foreground/60 mb-4">No companies found</p>
                <p className="text-sm text-foreground/50 mb-6">Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCity(null)
                    setSelectedServices([])
                    setMinRating(0)
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
