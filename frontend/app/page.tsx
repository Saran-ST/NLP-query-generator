"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Database,
  FileSpreadsheet,
  MessageSquare,
  Zap,
  Brain,
  Cpu,
  BarChart3,
  Code,
  Table,
  TrendingUp,
  Hash,
  Binary,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredBall, setHoveredBall] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const dataSymbols = [
    { icon: Database, delay: 0, duration: 15 },
    { icon: BarChart3, delay: 2, duration: 18 },
    { icon: Code, delay: 4, duration: 20 },
    { icon: Table, delay: 1, duration: 16 },
    { icon: TrendingUp, delay: 3, duration: 22 },
    { icon: Hash, delay: 5, duration: 19 },
    { icon: Binary, delay: 2.5, duration: 17 },
    { icon: Cpu, delay: 4.5, duration: 21 },
  ]

  return (
    <div className="min-h-screen bg-cream-50 text-rose-900 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(219, 39, 119, 0.05), transparent 40%)`,
        }}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        {dataSymbols.map((symbol, i) => {
          const Icon = symbol.icon
          return (
            <div
              key={i}
              className="absolute opacity-20 hover:opacity-40 transition-opacity duration-500"
              style={{
                left: `${10 + ((i * 11) % 80)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                animation: `float-${i} ${symbol.duration}s ease-in-out infinite`,
                animationDelay: `${symbol.delay}s`,
              }}
            >
              <Icon className="h-6 w-6 text-rose-400" />
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(20px, -30px) rotate(180deg); } }
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-25px, 35px) rotate(-90deg); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(30px, 20px) rotate(270deg); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-20px, -25px) rotate(90deg); } }
        @keyframes float-4 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(35px, -15px) rotate(-180deg); } }
        @keyframes float-5 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-30px, 40px) rotate(45deg); } }
        @keyframes float-6 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(25px, 30px) rotate(-45deg); } }
        @keyframes float-7 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-35px, -20px) rotate(135deg); } }
      `}</style>

      {/* Removed background dots with floating data symbols */}
      {/* <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full transition-all duration-1000 ${
              hoveredBall === i ? "bg-transparent border-2 border-rose-400 w-16 h-16" : "bg-rose-400/30"
            }`}
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + Math.sin(Date.now() / 8000 + i) * 20}%`,
              transform: `translateY(${Math.cos(Date.now() / 10000 + i * 0.5) * 30}px)`,
              pointerEvents: "auto",
            }}
            onMouseEnter={() => setHoveredBall(i)}
            onMouseLeave={() => setHoveredBall(null)}
          />
        ))}
      </div> */}

      {/* Header */}
      <header className="border-b border-rose-200 relative z-10 bg-cream-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Database className="h-10 w-10 text-rose-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-rose-900">QueryAI</h1>
                <p className="text-xs text-rose-600">Natural Language SQL Generator</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-rose-700 hover:text-rose-900 transition-colors duration-300">
                Features
              </a>
              <a href="#how-it-works" className="text-rose-700 hover:text-rose-900 transition-colors duration-300">
                How it Works
              </a>
              <Button
                variant="outline"
                className="border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-cream-50 bg-transparent transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 border border-rose-200 mb-8 hover:bg-rose-200 transition-all duration-300 hover:scale-105">
              <Cpu className="h-4 w-4 text-rose-600 mr-2" />
              <span className="text-sm text-rose-800">Powered by Advanced AI & NLP Models</span>
            </div>

            <h2 className="text-6xl md:text-7xl font-bold text-balance mb-8 leading-tight">
              Transform Your
              <span className="text-rose-600 font-extrabold"> Data </span>
              Into Insights
            </h2>

            <p className="text-xl text-rose-700 mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
              Upload Excel files, ask questions in plain English, and get instant SQL results. Our AI-powered platform
              makes database querying accessible to everyone, no technical expertise required.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-16">
              <Link href="/query">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-cream-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25 border-0 group"
                >
                  Start Querying Now
                  <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 text-rose-900">Powerful Features for Data Analysis</h3>
              <p className="text-xl text-rose-700 max-w-2xl mx-auto">
                Everything you need to transform your spreadsheets into a powerful database querying system
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-cream-100 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 backdrop-blur-sm group relative overflow-hidden hover:scale-105">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                  <FileSpreadsheet className="h-8 w-8 text-rose-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">Smart Excel Processing</h4>
                <p className="text-rose-700 leading-relaxed">
                  Advanced algorithms automatically detect data types, relationships, and create optimized database
                  schemas from your Excel files.
                </p>
              </Card>

              <Card className="p-8 bg-cream-100 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 backdrop-blur-sm group relative overflow-hidden hover:scale-105">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                  <Brain className="h-8 w-8 text-rose-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">AI-Powered NLP Engine</h4>
                <p className="text-rose-700 leading-relaxed">
                  State-of-the-art natural language processing converts your questions into precise SQL queries with
                  contextual understanding.
                </p>
              </Card>

              <Card className="p-8 bg-cream-100 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 backdrop-blur-sm group relative overflow-hidden hover:scale-105">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                  <MessageSquare className="h-8 w-8 text-rose-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">Conversational Interface</h4>
                <p className="text-rose-700 leading-relaxed">
                  Chat with your data naturally. Ask follow-up questions, refine queries, and explore insights through
                  conversation.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 bg-rose-50/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 text-rose-900">How It Works</h3>
              <p className="text-xl text-rose-700 max-w-2xl mx-auto">
                Get from spreadsheet to insights in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-cream-50 group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-rose-500/30">
                  1
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">Upload Your Data</h4>
                <p className="text-rose-700">
                  Simply drag and drop your Excel files. Our AI automatically analyzes and structures your data.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-cream-50 group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-rose-500/30">
                  2
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">Ask Questions</h4>
                <p className="text-rose-700">
                  Type your questions in plain English. Our NLP engine understands context and intent.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-cream-50 group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-rose-500/30">
                  3
                </div>
                <h4 className="text-xl font-semibold mb-4 text-rose-900">Get Insights</h4>
                <p className="text-rose-700">
                  Receive instant results with interactive tables, charts, and actionable insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-bold mb-6 text-rose-900">Ready to Transform Your Data?</h3>
              <p className="text-xl text-rose-700 mb-8">
                Join thousands of data professionals who trust QueryAI for their analysis needs
              </p>
              <Link href="/query">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-cream-50 px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25"
                >
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-200 bg-rose-50/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-8 w-8 text-rose-600" />
                <span className="text-xl font-bold text-rose-900">QueryAI</span>
              </div>
              <p className="text-rose-700 text-sm">
                Transforming data analysis with AI-powered natural language processing.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-rose-900">Product</h5>
              <ul className="space-y-2 text-sm text-rose-700">
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-rose-900">Company</h5>
              <ul className="space-y-2 text-sm text-rose-700">
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-rose-900">Support</h5>
              <ul className="space-y-2 text-sm text-rose-700">
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-900 transition-colors duration-300">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-rose-200 mt-12 pt-8 text-center text-rose-700 text-sm">
            <p>&copy; 2024 QueryAI. All rights reserved. Powered by advanced AI &amp; machine learning.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
