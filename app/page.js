'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedChannel, setSelectedChannel] = useState('')
  const [streamUrl, setStreamUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSearchResults(data.hits.hits || [])
    } catch (error) {
      console.error('Search failed:', error)
    }
    setLoading(false)
  }

  const handleGetStream = async (channelId) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stream/${channelId}`)
      const data = await response.json()
      setStreamUrl(data.streamUrl)
    } catch (error) {
      console.error('Stream fetch failed:', error)
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <header style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', padding: '20px', textAlign: 'center', boxShadow: '0 2px 4px var(--shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h1 style={{ margin: 0 }}>Radio Garden API Wrapper</h1>
            <p style={{ margin: '10px 0 0 0', color: 'var(--text-secondary)' }}>Unofficial API wrapper for Radio Garden with interactive documentation and testing</p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              padding: '10px 15px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px' }}>About</h2>
          <p style={{ color: 'var(--text-secondary)' }}>This is an unofficial wrapper for the Radio Garden API. It allows you to search for radio stations and retrieve their live MP3 stream URLs. Please note that this API is not officially supported by Radio Garden, and usage may be subject to their terms of service.</p>
          <p style={{ color: 'var(--text-secondary)' }}><strong>Disclaimer:</strong> This tool is for educational and personal use only. Respect copyright laws and the rights of content creators.</p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px' }}>API Documentation</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 45%', backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Search for Stations</h3>
              <p><strong>Endpoint:</strong> GET /api/search?q={"{query}"}</p>
              <p><strong>Description:</strong> Searches for radio stations matching the provided query.</p>
              <p><strong>Parameters:</strong></p>
              <ul>
                <li><code>q</code> (required): Search query string (e.g., "BBC", "Jazz")</li>
              </ul>
              <p><strong>Example Request:</strong></p>
              <pre>
{`GET /api/search?q=BBC`}
              </pre>
              <p><strong>Example Response:</strong></p>
              <pre style={{ maxHeight: '200px' }}>
{`{
  "hits": {
    "hits": [
      {
        "_source": {
          "page": {
            "url": "/listen/bbc-world-service/FXyhz9Xk",
            "title": "BBC World Service",
            "subtitle": "London, United Kingdom"
          }
        }
      }
    ]
  }
}`}
              </pre>
            </div>

            <div style={{ flex: '1 1 45%', backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Get Stream URL</h3>
              <p><strong>Endpoint:</strong> GET /api/stream/{"{channelId}"}</p>
              <p><strong>Description:</strong> Retrieves the MP3 stream URL for a specific channel.</p>
              <p><strong>Parameters:</strong></p>
              <ul>
                <li><code>channelId</code> (required): The channel ID extracted from search results</li>
              </ul>
              <p><strong>Example Request:</strong></p>
              <pre>
{`GET /api/stream/FXyhz9Xk`}
              </pre>
              <p><strong>Example Response:</strong></p>
              <pre>
{`{
  "streamUrl": "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service"
}`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '10px' }}>Test the API</h2>

          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow)', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--accent)' }}>Search for Stations</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search query (e.g., BBC)"
                style={{
                  padding: '10px',
                  flex: '1',
                  minWidth: '200px',
                  border: `1px solid var(--border)`,
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: loading ? 'var(--text-secondary)' : 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow)', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--accent)' }}>Search Results</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {searchResults.map((hit, index) => (
                  <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>{hit._source.page.title}</strong>
                        <br />
                        <small style={{ color: 'var(--text-secondary)' }}>{hit._source.page.subtitle}</small>
                      </div>
                      <button
                        onClick={() => handleGetStream(hit._source.page.url.split('/').pop())}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'var(--success)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Get Stream
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {streamUrl && (
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow)' }}>
              <h3 style={{ color: 'var(--accent)' }}>Stream URL</h3>
              <p style={{ wordBreak: 'break-all', backgroundColor: 'var(--code-bg)', padding: '10px', borderRadius: '4px', color: 'var(--text-primary)' }}>{streamUrl}</p>
              <audio controls style={{ width: '100%', marginTop: '10px' }}>
                <source src={streamUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </section>
      </main>

      <footer style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', textAlign: 'center', padding: '10px', marginTop: '40px', boxShadow: '0 -2px 4px var(--shadow)' }}>
        <p>&copy; 2025 Radio Garden API Wrapper. Not affiliated with Radio Garden.</p>
      </footer>
    </div>
  )
}