'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchSuggestion {
  symbol: string
  name: string
  exchange: string
  type: string
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
  ]

  // 防抖获取搜索建议
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 1) {
        fetchSuggestions(searchTerm)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300) // 300ms防抖

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/stocks/suggestions/${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setShowSuggestions(true)
        setSelectedIndex(-1)
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
      setSuggestions([])
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    const ticker = searchTerm.trim().toUpperCase()
    
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      router.push(`/company/${suggestions[selectedIndex].symbol}`)
    } else {
      router.push(`/company/${ticker}`)
    }
    
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.symbol)
    setShowSuggestions(false)
    router.push(`/company/${suggestion.symbol}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSearchSubmit(e)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📈
              </div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                StockAnalytics
              </h1>
            </div>
            
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Markets</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Watchlist</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Portfolio</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ padding: '0 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h2 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              lineHeight: '1.1'
            }}>
              <span style={{ color: '#f3f4f6' }}>Invest</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Smarter
              </span>
            </h2>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#9ca3af',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Get real-time market data, advanced analytics, and AI-powered insights 
              to make informed investment decisions.
            </p>

            {/* Enhanced Search Bar with Suggestions */}
            <div ref={searchRef} style={{ maxWidth: '600px', margin: '0 auto 4rem auto', position: 'relative' }}>
              <form onSubmit={handleSearchSubmit}>
                <div style={{ position: 'relative' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    placeholder="Search stocks (e.g., AAPL, Tesla, Microsoft)"
                    style={{
                      width: '100%',
                      padding: '1.5rem 1rem 1.5rem 3rem',
                      fontSize: '1.125rem',
                      background: 'rgba(31, 41, 55, 0.8)',
                      border: showSuggestions ? '2px solid #10b981' : '1px solid #374151',
                      borderRadius: suggestions.length > 0 && showSuggestions ? '16px 16px 0 0' : '16px',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }}>
                    🔍
                  </span>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '8px',
                      bottom: '8px',
                      padding: '0 2rem',
                      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'rgba(31, 41, 55, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid #10b981',
                  borderTop: 'none',
                  borderRadius: '0 0 16px 16px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 50,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.symbol}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        padding: '1rem 1.5rem',
                        cursor: 'pointer',
                        borderBottom: index < suggestions.length - 1 ? '1px solid #374151' : 'none',
                        background: selectedIndex === index ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ 
                            fontWeight: 'bold', 
                            fontSize: '1rem',
                            color: selectedIndex === index ? '#10b981' : 'white'
                          }}>
                            {suggestion.symbol}
                          </div>
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: '#9ca3af', 
                            marginTop: '0.25rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {suggestion.name}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(55, 65, 81, 0.5)',
                          borderRadius: '4px'
                        }}>
                          {suggestion.exchange}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Stocks */}
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#d1d5db' }}>
                Popular Stocks
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem'
              }}>
                {popularStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => router.push(`/company/${stock.symbol}`)}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(31, 41, 55, 0.5)',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(55, 65, 81, 0.8)'
                      e.currentTarget.style.borderColor = '#10b981'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)'
                      e.currentTarget.style.borderColor = '#374151'
                    }}
                  >
                    <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                      {stock.symbol}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                      {stock.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={{ 
            padding: '5rem 0', 
            borderTop: '1px solid #374151',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem'
              }}>
                📊
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Real-time Data
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Get live market data and price movements updated in real-time
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem'
              }}>
                📈
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Smart Search
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Intelligent search with real-time suggestions and auto-complete
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem'
              }}>
                💡
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Smart Insights
              </h3>
              <p style={{ color: '#9ca3af' }}>
                AI-powered recommendations and market sentiment analysis
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #374151', marginTop: '5rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <p>&copy; 2025 StockAnalytics. Built with AI assistance.</p>
        </div>
      </footer>
    </div>
  )
}