"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Database, Upload, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"

interface QueryResult {
  columns: string[]
  rows: any[][]
}

export default function QueryPage() {
  const [file, setFile] = useState<File | null>(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<QueryResult | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isQuerying, setIsQuerying] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // --- Upload Excel file ---
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/upload_excel", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadSuccess(true)
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // --- Run Query ---
  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsQuerying(true)
    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.result) // ✅ store only {columns, rows}
        console.log("SQL:", data.sql)
      }
    } catch (error) {
      console.error("Query failed:", error)
    } finally {
      setIsQuerying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-blue-100 text-rose-900">
      {/* Header */}
      <header className="border-b border-rose-200 bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <Database className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold text-rose-900">Natural Query Generator</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card className="bg-white/80 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rose-900">
                <Upload className="h-5 w-5 text-rose-600" />
                <span>Upload Excel File</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="bg-rose-50 border-rose-300 text-rose-900 file:text-rose-900 hover:border-rose-400 transition-colors duration-300"
                  />
                  <Button
                    type="submit"
                    disabled={!file || isUploading}
                    className="bg-rose-600 hover:bg-rose-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
                {uploadSuccess && (
                  <p className="text-rose-600 text-sm animate-in fade-in duration-300">
                    ✓ File uploaded successfully! You can now query your data.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Query Section */}
          <Card className="bg-white/80 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rose-900">
                <MessageSquare className="h-5 w-5 text-rose-600" />
                <span>Ask Your Question</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuery} className="space-y-4">
                <Textarea
                  placeholder="Ask in plain English... e.g. 'show only topic' or 'highest completed'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[120px] bg-rose-50 border-rose-300 text-rose-900 placeholder:text-rose-600 resize-none hover:border-rose-400 focus:border-rose-500 transition-colors duration-300"
                />
                <Button
                  type="submit"
                  disabled={!query.trim() || isQuerying}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto transition-all duration-300 hover:scale-105"
                >
                  {isQuerying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Query...
                    </>
                  ) : (
                    "Get Results"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          {results && (
            <Card className="bg-white/80 border-rose-200 animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-xl hover:shadow-rose-500/20 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-rose-900">Query Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-rose-300">
                        {results.columns.map((column, index) => (
                          <th key={index} className="text-left p-3 font-semibold text-rose-900">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-b border-rose-200 hover:bg-rose-100 transition-colors duration-300"
                        >
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-3 text-rose-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
