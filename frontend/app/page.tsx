'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchTerm.trim()) return
    
    const ticker = searchTerm.trim().toUpperCase()
    router.push(`/company/${ticker}`)
  }

  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
  ]

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

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto 4rem auto' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search stocks (e.g., AAPL, TSLA, META)"
                  style={{
                    width: '100%',
                    padding: '1.5rem 1rem 1.5rem 3rem',
                    fontSize: '1.125rem',
                    background: 'rgba(31, 41, 55, 0.8)',
                    border: '1px solid #374151',
                    borderRadius: '16px',
                    color: 'white',
                    outline: 'none'
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
                  Search
                </button>
              </div>
            </form>

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
                Advanced Analytics
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Comprehensive financial analysis and technical indicators
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