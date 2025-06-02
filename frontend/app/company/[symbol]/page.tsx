'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CompanyProfile {
  symbol: string
  companyName: string
  industry: string
  sector: string
  description: string
  website: string
  ceo: string
  employees: number
  country: string
}

interface StockQuote {
  symbol: string
  price: number
  change: number
  changesPercentage: number
  dayLow: number
  dayHigh: number
  yearHigh: number
  yearLow: number
  marketCap: number
  volume: number
  avgVolume: number
}

interface ChartData {
  date: string
  price: number
  volume: number
}

export default function CompanyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [quote, setQuote] = useState<StockQuote | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (symbol) {
      fetchCompanyData()
    }
  }, [symbol])

  const fetchCompanyData = async () => {
    try {
      setLoading(true)
      setError(null)

      // 获取公司档案
      const profileResponse = await fetch(`http://localhost:8000/api/stocks/search/${symbol}`)
      if (!profileResponse.ok) throw new Error('Company not found')
      const profileData = await profileResponse.json()
      setProfile(profileData.profile)

      // 获取股票报价
      const quoteResponse = await fetch(`http://localhost:8000/api/stocks/quote/${symbol}`)
      if (!quoteResponse.ok) throw new Error('Quote not found')
      const quoteData = await quoteResponse.json()
      setQuote(quoteData.quote)

      // 获取历史数据
      const historicalResponse = await fetch(`http://localhost:8000/api/stocks/historical/${symbol}`)
      if (historicalResponse.ok) {
        const historicalData = await historicalResponse.json()
        
        // 处理历史数据为图表格式
        if (historicalData.data && historicalData.data.historical) {
          const chartData = historicalData.data.historical
            .slice(0, 30) // 最近30天
            .reverse()
            .map((item: { date: string; close: number; volume: number }): ChartData => ({
                date: item.date,
                price: item.close,
                volume: item.volume
              }))
          setChartData(chartData)
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #374151',
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }}></div>
          <p>Loading {symbol} data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Error Loading Data</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>{error}</p>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(31, 41, 55, 0.8)',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
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
      </header>

      <main style={{ padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Company Header */}
          {profile && quote && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{symbol}</h1>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(31, 41, 55, 0.8)',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#9ca3af'
                }}>
                  {profile.sector}
                </span>
              </div>
              
              <h2 style={{ fontSize: '1.5rem', color: '#d1d5db', marginBottom: '1rem' }}>
                {profile.companyName}
              </h2>

              {/* Stock Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                  {formatCurrency(quote.price)}
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  color: quote.change >= 0 ? '#10b981' : '#ef4444',
                  fontWeight: '600'
                }}>
                  {quote.change >= 0 ? '+' : ''}{formatCurrency(quote.change)} 
                  ({quote.changesPercentage >= 0 ? '+' : ''}{quote.changesPercentage.toFixed(2)}%)
                </span>
              </div>

              {/* Key Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Market Cap</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>${formatNumber(quote.marketCap)}</div>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Volume</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{formatNumber(quote.volume)}</div>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Day Range</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    {formatCurrency(quote.dayLow)} - {formatCurrency(quote.dayHigh)}
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>52W Range</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    {formatCurrency(quote.yearLow)} - {formatCurrency(quote.yearHigh)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price Chart */}
          {chartData.length > 0 && (
            <div style={{
              padding: '2rem',
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid #374151',
              borderRadius: '12px',
              marginBottom: '3rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Price Chart (30 Days)
              </h3>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Price']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Company Info */}
          {profile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{
                padding: '2rem',
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  Company Overview
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Industry: </span>
                    <span>{profile.industry}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>CEO: </span>
                    <span>{profile.ceo}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Employees: </span>
                    <span>{profile.employees?.toLocaleString()}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Country: </span>
                    <span>{profile.country}</span>
                  </div>
                  {profile.website && (
                    <div>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Website: </span>
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        style={{ color: '#10b981', textDecoration: 'none' }}
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                padding: '2rem',
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  About
                </h3>
                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  {profile.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}